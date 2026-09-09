import dbConnect from "./mongodb";
import Plan from "./models/Plan";
import Post from "./models/Post";
import Product from "./models/Product";

function serialize(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    _id: String(obj._id),
    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : null,
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : null,
  };
}

// Every fetcher below NEVER throws: on missing env, no network, or any
// other DB failure it logs and returns null so public pages can fall back
// to local content. An empty array means "reachable, but no documents".
export async function getPlans() {
  try {
    await dbConnect();
    const plans = await Plan.find().sort({ createdAt: 1 }).lean();
    return plans.map(serialize);
  } catch (err) {
    console.error("getPlans failed, using fallback:", err.message);
    return null;
  }
}

export async function getPosts() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    return posts.map(serialize);
  } catch (err) {
    console.error("getPosts failed, using fallback:", err.message);
    return null;
  }
}

export async function getPostBySlug(slug) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug }).lean();
    return post ? serialize(post) : null;
  } catch (err) {
    console.error("getPostBySlug failed, using fallback:", err.message);
    return null;
  }
}

export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return products.map(serialize);
  } catch (err) {
    console.error("getProducts failed, using fallback:", err.message);
    return null;
  }
}
