import React from "react";

const AddUserModal = ({}) => {
  return (
    <div class="relative h-full w-full max-w-2xl px-4 md:h-auto">
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
        <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-700">
          <h3 class="text-xl font-semibold dark:text-white">Add new user</h3>
          <button
            type="button"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            data-modal-toggle="add-user-modal"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="space-y-6 p-6">
          <form action="#">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first-name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                  placeholder="Bonnie"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                  placeholder="Green"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                  placeholder="example@company.com"
                  required
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="position"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                  placeholder="e.g. React developer"
                  required
                />
              </div>
              <div class="col-span-6">
                <label
                  for="biography"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Biography
                </label>
                <textarea
                  id="biography"
                  rows="4"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="👨‍💻Full-stack web developer. Open-source contributor."
                ></textarea>
              </div>
            </div>
            <div class="items-center rounded-b border-t border-gray-200 p-6 dark:border-gray-700">
              <button
                class="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="submit"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
