# mongoose-soft

[![Build Status](https://travis-ci.org/kozzztya/mongoose-soft.svg?branch=master)](https://travis-ci.org/kozzztya/mongoose-soft)
[![Coverage Status](https://coveralls.io/repos/github/kozzztya/mongoose-soft/badge.svg?branch=master)](https://coveralls.io/github/kozzztya/mongoose-soft?branch=master)

Mongoose soft delete. I created it because other packages that I tested didn't work properly.

## How it works

`Model.remove()` was extended to set `deleted: true` without real removing.
Middleware was added to methods `find`, `findOne`, `update`, `findOneAndUpdate`, `findOneAndRemove` to show only data without `deleted: true`.

## Configuration

```js
const mongoose = require('mongoose');
const softDelete = require('mongoose-soft');

const db = mongoose.createConnection('mongodb://localhost:27017/your-db');
const schema = new mongoose.Schema({ text: String });

schema.plugin(softDelete);
db.model('posts', schema);
```

## Find deleted data

If you want to see deleted data pass `deleted: true` in the query object.
If you want to see all data pass `deleted: { $in: [null, true, false] }`.
