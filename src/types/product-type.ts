type productType = {
  productName: string,
  productPrice: number,
  productCategory: string,
  productByGender: string,
  productBySeason: string,
  productQuantity: number,
  productOwnerId: string,
};

type productQuery = {
  pageNumber: number,
  pageSize: number,
  queryString: string,
  productCategory: string,
  productByGender: string,
  productBySeason: string,
  productByPrice: number
};


export { productQuery };
export default productType;