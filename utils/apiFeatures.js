class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    // Filter
    const queryObject = { ...this.queryString };
    const excludedFields = ["sort", "fields", "page", "limit", "keyword"];
    excludedFields.forEach((el) => delete queryObject[el]);

    console.log("Query Object (before processing):", queryObject);

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (val) => `$${val}`
    );
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  fieldLimiting() {
    // Fields Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  pagination(documentsCount) {
    const page = Math.max(1, this.queryString.page * 1 || 1);
    const limit = Math.max(1, this.queryString.limit * 1 || 10);
    const skip = (page - 1) * limit;
    const endIndex = limit * page;

    const paginationInfo = {};
    paginationInfo.currentPage = page;
    paginationInfo.limit = limit;
    paginationInfo.numberOfPages = Math.ceil(documentsCount / limit);

    //next page
    if (documentsCount > endIndex) {
      paginationInfo.next = page + 1;
    }

    //previous page
    if (skip > 0) {
      paginationInfo.previous = page - 1;
    }
    this.paginationInfo = paginationInfo;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let keyword;
      if (modelName === "products") {
        keyword = {
          $or: [
            { title: { $regex: this.queryString.keyword, $options: "i" } },
            {
              description: { $regex: this.queryString.keyword, $options: "i" },
            },
          ],
        };
      } else {
        keyword = {
          $or: [{ name: { $regex: this.queryString.keyword, $options: "i" } }],
        };
      }

      this.mongooseQuery = this.mongooseQuery.find(keyword);
    }
    return this;
  }
}

module.exports = ApiFeatures;
