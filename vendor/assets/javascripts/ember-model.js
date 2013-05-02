(function() {
Ember.Adapter = Ember.Object.extend({
  find: function(record, id) {
    throw new Error('Ember.Adapter subclasses must implement find');
  },

  findQuery: function(record, id) {
    throw new Error('Ember.Adapter subclasses must implement findQuery');
  },

  findMany: function(record, id) {
    throw new Error('Ember.Adapter subclasses must implement findMany');
  },

  findAll: function(klass, records) {
    throw new Error('Ember.Adapter subclasses must implement findAll');
  },

  load: function(record, id, data) {
    record.load(id, data);
  },

  createRecord: function(record) {
    throw new Error('Ember.Adapter subclasses must implement createRecord');
  },

  saveRecord: function(record) {
    throw new Error('Ember.Adapter subclasses must implement saveRecord');
  },

  deleteRecord: function(record) {
    throw new Error('Ember.Adapter subclasses must implement deleteRecord');
  }
});
})();



(function() {
Ember.FixtureAdapter = Ember.Adapter.extend({
  find: function(record, id) {
    var fixtures = record.constructor.FIXTURES,
        data = Ember.A(fixtures).find(function(el) { return el.id === id; });

    if (!record.get('isLoaded')) {
      setTimeout(function() {
        Ember.run(record, record.load, id, data);
      });
    }
  },

  findMany: function(klass, records, ids) {
    var fixtures = klass.FIXTURES,
        requestedData = [];

    for (var i = 0, l = ids.length; i < l; i++) {
      requestedData.push(fixtures[i]);
    }

    setTimeout(function() {
      Ember.run(records, records.load, klass, requestedData);
    });
  },

  findAll: function(klass, records) {
    var fixtures = klass.FIXTURES;

    setTimeout(function() {
      Ember.run(records, records.load, klass, fixtures);
    });
  },

  createRecord: function(record) {
    var klass = record.constructor,
        fixtures = klass.FIXTURES,
        deferred = Ember.Deferred.create();

    deferred.then(function() {
      record.didCreateRecord();
    });
    setTimeout(function() {
      Ember.run(function() {
        fixtures.push(klass.findFromCacheOrLoad(record.toJSON()));
        deferred.resolve(record);
      });
    });
    return deferred;
  },

  saveRecord: function(record) {
    var deferred = Ember.Deferred.create();
    deferred.then(function() {
      record.didSaveRecord();
    });
    setTimeout(function() {
      Ember.run(deferred, deferred.resolve, record);
    });
    return deferred;
  },

  deleteRecord: function(record) {
    var deferred = Ember.Deferred.create();
    deferred.then(function() {
      record.didDeleteRecord();
    });
    setTimeout(function() {
      Ember.run(deferred, deferred.resolve, record);
    });
    return deferred;
  }
});
})();



(function() {
var get = Ember.get,
    set = Ember.set;

Ember.RecordArray = Ember.ArrayProxy.extend(Ember.Evented, Ember.DeferredMixin, {
  isLoaded: false,
  isLoading: Ember.computed.not('isLoaded'),

  length: Ember.computed(function() {
    var idsLength = get(this, '_ids.length');
    if (idsLength) { return idsLength; }
    return get(this, 'content.length');
  }).property('_ids', 'content.length'),

  load: function(klass, data) {
    set(this, 'content', this.materializeData(klass, data));
    this.notifyLoaded();
  },

  loadForFindMany: function(klass) {
    var content = get(this, '_ids').map(function(id) { return klass.cachedRecordForId(id); });
    set(this, 'content', Ember.A(content));
    this.notifyLoaded();
  },

  notifyLoaded: function() {
    set(this, 'isLoaded', true);
    this.trigger('didLoad');
    this.resolve(this);
  },

  materializeData: function(klass, data) {
    return Ember.A(data.map(function(el) {
      return klass.findFromCacheOrLoad(el); // FIXME
    }));
  }
});
})();



(function() {
var get = Ember.get;

Ember.FilteredRecordArray = Ember.RecordArray.extend({
  init: function() {
    if (!get(this, 'modelClass')) {
      throw new Error('FilteredRecordArrays must be created with a modelClass');
    }
    if (!get(this, 'filterFunction')) {
      throw new Error('FilteredRecordArrays must be created with a filterFunction');
    }
    if (!get(this, 'filterProperties')) {
      throw new Error('FilteredRecordArrays must be created with filterProperties');
    }

    var modelClass = get(this, 'modelClass');
    modelClass.registerRecordArray(this);

    this.registerObservers();
    this.updateFilter();
  },

  updateFilter: function() {
    var self = this,
        results = [];
    get(this, 'modelClass').forEachCachedRecord(function(record) {
      if (self.filterFunction(record)) {
        results.push(record);
      }
    });
    this.set('content', Ember.A(results));
  },

  updateFilterForRecord: function(record) {
    var results = get(this, 'content');
    if (this.filterFunction(record)) {
      results.pushObject(record);
    }
  },

  registerObservers: function() {
    var self = this;
    get(this, 'modelClass').forEachCachedRecord(function(record) {
      self.registerObserversOnRecord(record);
    });
  },

  registerObserversOnRecord: function(record) {
    var self = this,
        filterProperties = get(this, 'filterProperties');

    for (var i = 0, l = get(filterProperties, 'length'); i < l; i++) {
      record.addObserver(filterProperties[i], self, 'updateFilterForRecord');
    }
  }
});
})();



(function() {
var get = Ember.get,
    set = Ember.set,
    meta = Ember.meta;

function contains(array, element) {
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] === element) { return true; }
  }
  return false;
}

function concatUnique(toArray, fromArray) {
  var e;
  for (var i = 0, l = fromArray.length; i < l; i++) {
    e = fromArray[i];
    if (!contains(toArray, e)) { toArray.push(e); }
  }
  return toArray;
}

Ember.run.queues.push('data');

Ember.Model = Ember.Object.extend(Ember.Evented, Ember.DeferredMixin, {
  isLoaded: true,
  isLoading: Ember.computed.not('isLoaded'),
  isNew: true,
  isDeleted: false,
  _dirtyAttributes: null,

  // TODO: rewrite w/o volatile
  isDirty: Ember.computed(function() {
    var attributes = this.attributes,
        dirtyAttributes = this._dirtyAttributes,
        key, cachedValue, dataValue, desc, descMeta, type, isDirty;
    for (var i = 0, l = attributes.length; i < l; i++) {
      key = attributes[i];
      cachedValue = this.cacheFor(key);
      dataValue = get(this, 'data.'+key);
      desc = meta(this).descs[key];
      descMeta = desc && desc.meta();
      type = descMeta.type;
      isDirty = dirtyAttributes && dirtyAttributes.indexOf(key) !== -1;
      if (!isDirty && type && type.isEqual) {
        if (!type.isEqual(dataValue, cachedValue || dataValue)) { // computed property won't have a value when just loaded
          if (!dirtyAttributes) {
            dirtyAttributes = this._dirtyAttributes = Ember.A();
          }
          dirtyAttributes.push(key);
        }
      }

    }
    return dirtyAttributes && dirtyAttributes.length !== 0;
  }).property().volatile(),


  load: function(id, hash) {
    var data = Ember.merge({id: id}, hash);
    set(this, 'data', data);
    set(this, 'isLoaded', true);
    set(this, 'isNew', false);
    this.trigger('didLoad');
    this.resolve(this);
  },

  didDefineProperty: function(proto, key, value) {
    if (value instanceof Ember.Descriptor) {
      var meta = value.meta();

      if (meta.isAttribute) {
        if (!proto.attributes) { proto.attributes = []; }
        proto.attributes.push(key);
      }
    }
  },

  toJSON: function() {
    return this.getProperties(this.attributes);
  },

  save: function() {
    var adapter = this.constructor.adapter;
    set(this, 'isSaving', true);
    if (get(this, 'isNew')) {
      return adapter.createRecord(this);
    } else if (get(this, 'isDirty')) {
      return adapter.saveRecord(this);
    } else {
      var deferred = Ember.Deferred.create();
      deferred.resolve(this);
      return deferred;
    }
  },

  didCreateRecord: function() {
    set(this, 'isNew', false);
    this.load(this.get('id'), this.getProperties(this.attributes));
    this.constructor.addToRecordArrays(this);
    this.trigger('didCreateRecord');
    this.didSaveRecord();
  },

  didSaveRecord: function() {
    set(this, 'isSaving', false);
    this.trigger('didSaveRecord');
    this._copyDirtyAttributesToData();
  },

  deleteRecord: function() {
    return this.constructor.adapter.deleteRecord(this);
  },

  didDeleteRecord: function() {
    this.constructor.removeFromRecordArrays(this);
    set(this, 'isDeleted', true);
    this.trigger('didDeleteRecord');
  },

  _copyDirtyAttributesToData: function() {
    if (!this._dirtyAttributes) { return; }
    var dirtyAttributes = this._dirtyAttributes,
        data = get(this, 'data'),
        key;

    if (!data) {
      data = {};
      set(this, 'data', data);
    }
    for (var i = 0, l = dirtyAttributes.length; i < l; i++) {
      // TODO: merge Object.create'd object into prototype
      key = dirtyAttributes[i];
      data[key] = this.cacheFor(key);
    }
    this._dirtyAttributes = [];
  }
});

Ember.Model.reopenClass({
  adapter: Ember.Adapter.create(),

  find: function(id) {
    if (!arguments.length) {
      return this.findAll();
    } else if (Ember.typeOf(id) === 'array') {
      return this.findMany(id);
    } else if (typeof id === 'object') {
      return this.findQuery(id);
    } else {
      return this.findById(id);
    }
  },

  findMany: function(ids) {
    var records = Ember.RecordArray.create({_ids: ids});

    if (!this.recordArrays) { this.recordArrays = []; }
    this.recordArrays.push(records);

    if (this._currentBatchIds) {
      concatUnique(this._currentBatchIds, ids);
      this._currentBatchRecordArrays.push(records);
    } else {
      this._currentBatchIds = concatUnique([], ids);
      this._currentBatchRecordArrays = [records];
    }

    Ember.run.scheduleOnce('data', this, this._executeBatch);

    return records;
  },

  findAll: function() {
    if (this._findAllRecordArray) { return this._findAllRecordArray; }

    var records = this._findAllRecordArray = Ember.RecordArray.create();

    this.adapter.findAll(this, records);

    return records;
  },

  _currentBatchIds: null,
  _currentBatchRecordArrays: null,

  findById: function(id) {
    var record = this.cachedRecordForId(id),
        adapter = get(this, 'adapter');

    if (!get(record, 'isLoaded')) {
      if (adapter.findMany) {
        if (this._currentBatchIds) {
          if (!contains(this._currentBatchIds, id)) { this._currentBatchIds.push(id); }
        } else {
          this._currentBatchIds = [id];
          this._currentBatchRecordArrays = [];
        }

        Ember.run.scheduleOnce('data', this, this._executeBatch);
      } else {
        adapter.find(record, id);
      }
    }
    return record;
  },

  _executeBatch: function() {
    var batchIds = this._currentBatchIds,
        batchRecordArrays = this._currentBatchRecordArrays,
        self = this,
        records;

    this._currentBatchIds = null;
    this._currentBatchRecordArrays = null;

    if (batchIds.length === 1) {
      get(this, 'adapter').find(this.cachedRecordForId(batchIds[0]), batchIds[0]);
    } else {
      records = Ember.RecordArray.create({_ids: batchIds}),
      get(this, 'adapter').findMany(this, records, batchIds);
      records.then(function() {
        for (var i = 0, l = batchRecordArrays.length; i < l; i++) {
          batchRecordArrays[i].loadForFindMany(self);
        }
      });
    }
  },

  findQuery: function(params) {
    var records = Ember.RecordArray.create();

    this.adapter.findQuery(this, records, params);

    return records;
  },

  cachedRecordForId: function(id) {
    if (!this.recordCache) { this.recordCache = {}; }
    var sideloadedData = this.sideloadedData && this.sideloadedData[id];
    var record = this.recordCache[id] || (sideloadedData ? this.create(sideloadedData) : this.create({isLoaded: false}));
    if (!this.recordCache[id]) { this.recordCache[id] = record; }
    return record;
  },

  addToRecordArrays: function(record) {
    if (this._findAllRecordArray) {
      this._findAllRecordArray.pushObject(record);
    }
    if (this.recordArrays) {
      this.recordArrays.forEach(function(recordArray) {
        if (recordArray instanceof Ember.FilteredRecordArray) {
          recordArray.registerObserversOnRecord(record);
          recordArray.updateFilter();
        } else {
          recordArray.pushObject(record);
        }
      });
    }
  },

  removeFromRecordArrays: function(record) {
    if (this._findAllRecordArray) {
      this._findAllRecordArray.removeObject(record);
    }
    if (this.recordArrays) {
      this.recordArrays.forEach(function(recordArray) {
        recordArray.removeObject(record);
      });
    }
  },

  // FIXME
  findFromCacheOrLoad: function(data) {
    var record = this.cachedRecordForId(data.id);
    // set(record, 'data', data);
    record.load(data.id, data);
    return record;
  },

  registerRecordArray: function(recordArray) {
    if (!this.recordArrays) { this.recordArrays = []; }
    this.recordArrays.push(recordArray);
  },

  unregisterRecordArray: function(recordArray) {
    if (!this.recordArrays) { return; }
    Ember.A(this.recordArrays).removeObject(recordArray);
  },

  forEachCachedRecord: function(callback) {
    if (!this.recordCache) { return Ember.A([]); }
    var ids = Object.keys(this.recordCache);
    ids.map(function(id) {
      return this.recordCache[parseInt(id, 10)];
    }, this).forEach(callback);
  },

  load: function(hashes) {
    if (!this.sideloadedData) { this.sideloadedData = {}; }
    for (var i = 0, l = hashes.length; i < l; i++) {
      var hash = hashes[i];
      this.sideloadedData[hash.id] = hash; // FIXME: hardcoding `id` property
    }
  }
});
})();



(function() {
var get = Ember.get,
    set = Ember.set,
    meta = Ember.meta;

Ember.attr = function(type) {
  return Ember.computed(function(key, value) {
    var data = get(this, 'data'),
        dataValue = data && get(data, key),
        beingCreated = meta(this).proto === this;

    if (arguments.length === 2) {
      if (beingCreated) {
        if (!data) {
          data = {};
          set(this, 'data', data);
          data[key] = value;
        }
        return value;
      }

      var isEqual;
      if (type && type.isEqual) {
        isEqual = type.isEqual(dataValue, value);
      } else {
        isEqual = dataValue === value;
      }

      if (!isEqual) {
        if (!this._dirtyAttributes) { this._dirtyAttributes = Ember.A(); }
        this._dirtyAttributes.push(key);
      } else {
        if (this._dirtyAttributes) { this._dirtyAttributes.removeObject(key); }
      }
      return value;
    }

    if (typeof dataValue === 'object') {
      dataValue = Object.create(dataValue);
    }
    return dataValue;
  }).property('data').meta({isAttribute: true, type: type});
};
})();



(function() {

})();

