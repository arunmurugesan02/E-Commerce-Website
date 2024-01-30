class APIFeatures {
  constructor(query, queryStr) {  //query ==> Db object modal && queryStr ==> query parameters in api
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    let keyword = this.queryStr.keyword //parameter name
      ? {
          name: {
            $regex: this.queryStr.keyword, //regex ==>search all records matching one by one
            $options: "i",
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryStrCopy = { ...this.queryStr };

    // removing all fields
    const removingFields = ["keyword", "limit", "page"];
    removingFields.forEach((field) => delete queryStrCopy[field]);

    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }
  paginate() {
    const currentPage = Number(this.queryStr.page) || 1;
    const resPerPage = Number(this.queryStr.res) ||  3;

    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

module.exports = APIFeatures;
