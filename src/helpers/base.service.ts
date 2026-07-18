export class BaseService<T> {
  protected applyScope(where: any, user?: any) {
    if (!user || user.role !== 'admin') {
      where.status = 1;
    }
    return where;
  }
}