import mongoose, { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, {
  ProductDocument,
  ProductInput,
} from '../models/product.model';
import { databaseResponseTimeHistogram } from '../utils/metrics';
export async function createProduct(input: ProductInput) {
  const metricLabel = {
    operation: 'createProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer(); // calc time for creating a product
  try {
    const result = await ProductModel.create(input);
    timer({ ...metricLabel, success: String(true) });
    return result;
  } catch (err) {
    timer({ ...metricLabel, success: String(false) });
    throw err;
  }
}
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return await ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  Update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return await ProductModel.findOneAndUpdate(query, Update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return await ProductModel.deleteOne(query);
}
