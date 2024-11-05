import { CategoriesCollection } from "../../iso/db/CategoriesCollection";
import { useFind, useSubscribe } from "meteor/react-meteor-data";

/**
 * Hook to get all tasks from the database.
 * Use this hook inside a React component.
 * @category Hooks
 * @returns {{tasks: Array, loading: Boolean}}
 * Object with tasks and loading state
 * @example
 *
 * // Get all tasks inside a React component
 * const { tasks, loading } = useTasks();
 *
 * // Show loading message while fetching tasks
 * if (loading) return <div>Loading...</div>;
 *
 * // Show tasks
 * return <div>{tasks.map(task => <Task key={task._id}
 * task={task} />)}</div>;
 */
export const useCategories = () => {
  // Subscribe to tasks collection
  const isLoading = useSubscribe("categories");
  // Get all tasks from the database
  const categories = useFind(() => CategoriesCollection.find({}), []);

  // Return tasks and loading state
  return { categories: categories, loading: isLoading() };
};
