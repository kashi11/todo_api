import PaginationOptions from "../../InfraStructure/Utils/PaginationOptions";

export default class GetAllTodoDTO {
  public paginationOptions: PaginationOptions;
  public userId: string;

  constructor(request: any) {
    const { page, perPage } = request.query;
    this.paginationOptions = new PaginationOptions({
      perPage: perPage ?? 10,
      currentPage: page ?? 1,
    });
    this.userId = request.user.userId;
  }
}
