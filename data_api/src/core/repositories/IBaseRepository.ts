export interface IBaseRepository<TEntity, TFilter> {
	/**
	 * Deletes entity specified by the given filter if exists.
	 * @param filter specification of the entity to delete.
	 */
	delete(filter: TFilter): Promise<TEntity | undefined>

	/**
	 * Returns entity specified by the given filter if exists.
	 * @param filter specification of the entity to retrieve.
	 */
	find(filter: TFilter): Promise<TEntity | undefined>

	/**
	 * Returns every entity in the repository.
	 */
	findAll(): Promise<TEntity[]>

	/**
	 * Updates fields of the entity given by the filter.
	 * @param filter specification of the entity to update.
	 * @param updateFields fiels of the entity to update.
	 */
	update(
		filter: TFilter,
		updateFields: Partial<TEntity>,
	): Promise<TEntity | undefined>

	/**
	 * Stores the given entity.
	 * @param newEntity new entity to store.
	 */
	save(newEntity: Partial<TEntity>): Promise<TEntity | undefined>
}
