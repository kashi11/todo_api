import PaginationOptions from "./PaginationOptions";

interface PaginatedDataInputs {
  items: Array<any>;
  count: number;
  paginationOptions: PaginationOptions;
}
class PaginationData {
  public items: Array<any>;
  public count: number;
  public paginationOptions: PaginationOptions;
  constructor(paginatedDataInputs: PaginatedDataInputs) {
    this.items = paginatedDataInputs.items;
    this.count = paginatedDataInputs.count;
    this.paginationOptions = paginatedDataInputs.paginationOptions;
  }

  nextPage(): number {
    if (
      this.paginationOptions.currentPage + 1 >
      Math.ceil(this.count / this.paginationOptions.perPage)
    )
      return 0;
    else return this.paginationOptions.currentPage + 1;
  }

  prevPage(): number {
    return this.paginationOptions.currentPage - 1;
  }

  getPaginatedData(): any{
    const paginationInfo = {
      perPage: this.paginationOptions.limit(),
      currentPage: this.paginationOptions.currentPage,
      nextPage: this.nextPage(),
      prevPage: this.prevPage(),
      totalItems: this.count,
    };
    return {
      data: this.items,
      paginationInfo,
    };
  }
}

export default PaginationData;
