const { test, db } = require('./env');

const Post = db.model('posts');
const newText = 'new';

let deletedPost;
let existPost;
test.before(async () => {
  existPost = await Post.create({ text: Date.now().toString() });
  deletedPost = await Post.create({ text: Date.now().toString() });
  await Post.remove({ _id: deletedPost.id });
});

test('find', async (t) => {
  const res = await Post.find({ _id: deletedPost.id });
  t.is(res.length, 0);
});

test('findOne', async (t) => {
  const res = await Post.findOne({ _id: deletedPost.id });
  t.falsy(res);
});

test('find with deleted: true', async (t) => {
  const res = await Post.find({ _id: deletedPost.id, deleted: true });
  t.is(res.length, 1);
  t.truthy(res[0].deleted);
});

test('findOne with deleted: true', async (t) => {
  const res = await Post.findOne({ _id: deletedPost.id, deleted: true });
  t.truthy(res.deleted);
});

test('update deleted', async (t) => {
  const res = await Post.update({ _id: deletedPost.id }, { text: newText });
  t.is(res.nModified, 0);
});

test('update not deleted', async (t) => {
  const res = await Post.update({ _id: existPost.id }, { text: newText });
  t.is(res.nModified, 1);
});

test('findOneAndUpdate deleted', async (t) => {
  const res = await Post.findOneAndUpdate({ _id: deletedPost.id }, { text: newText });
  t.falsy(res);
});

test('findOneAndUpdate not deleted', async (t) => {
  const res = await Post.findOneAndUpdate({ _id: existPost.id }, { text: newText });
  t.is(res.text, newText);
  t.is(res.deleted, undefined);
});

test.after(async (t) => {
  const res = await Post.findOneAndRemove({ _id: existPost.id }, { text: newText });
  t.is(res.text, newText);
  t.is(res.deleted, undefined);

  const deleted = await Post.findOne({ _id: deletedPost.id, deleted: true });
  t.truthy(deleted);
});
