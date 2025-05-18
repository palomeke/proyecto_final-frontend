import React, { useEffect, useState } from "react";
import Badge from "../components/pages/Badge";
import { Link } from "react-router-dom";
import Task from "../components/pages/Task";
import { showToast } from "../helpers/showToast";

const TaskListPage = () => {
  const [referesh, setReferesh] = useState(false);
  const [tasks, setTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState();
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    setReferesh(false);
    const getTask = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/task/get-all-task`
      );
      const responseData = await response.json();
      setTasks(responseData);
      setFilteredTasks(responseData);
    };
    getTask();
  }, [referesh]);

  useEffect(() => {
    if (!tasks) return;

    let result = tasks.taskData;

    // Filtrar por estado
    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    // Filtrar por texto (título o descripción)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por rango de fechas
    if (filters.dateFrom || filters.dateTo) {
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      result = result.filter((task) => {
        if (!task.dueDate) return true; // Si no tiene fecha, no se filtra

        const taskDate = new Date(task.dueDate);

        if (fromDate && taskDate < fromDate) return false;
        if (toDate && taskDate > toDate) return false;

        return true;
      });
    }

    setFilteredTasks({ ...tasks, taskData: result });
  }, [filters, tasks]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTask = async (taskid) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/task/delete-task/${taskid}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setReferesh(true);
      showToast("success", responseData.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>

      {/* Filtros */}
      <div className="mb-5 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Search
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by title or description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              From Date
            </label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              To Date
            </label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>

      {filteredTasks && filteredTasks.status ? (
        filteredTasks.taskData.length > 0 ? (
          filteredTasks.taskData.map((task) => (
            <Task key={task._id} props={task} onDelete={deleteTask} />
          ))
        ) : (
          <>No tasks found with current filters.</>
        )
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default TaskListPage;
