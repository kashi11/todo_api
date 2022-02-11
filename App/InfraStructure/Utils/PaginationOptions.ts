interface Options {
  currentPage: number;
  perPage: number;
}

class PaginationOptions {
  public currentPage: number;
  public perPage: number;

  constructor(options: Options) {
    this.currentPage = options.currentPage;
    this.perPage = options.perPage;
  }

  limit(): number {
    return this.perPage;
  }

  offset(): number {
    return (this.currentPage - 1) * this.limit();
  }
}

export default PaginationOptions;
