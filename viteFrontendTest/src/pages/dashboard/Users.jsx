// UserListPage.js
import React, { useState } from "react";

export function Users() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="mb-5 flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2.5 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <a
                      href="#"
                      className="ml-1 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white md:ml-2"
                    >
                      Users
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="ml-1 text-gray-400 dark:text-gray-500 md:ml-2"
                      aria-current="page"
                    >
                      List
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All users
            </h1>
          </div>
          <div class="sm:flex">
            <div class="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form class="lg:pr-3" action="#" method="GET">
                <label for="users-search" class="sr-only">
                  Search
                </label>
                <div class="relative mt-1 lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="users-search"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                    placeholder="Search for users"
                  />
                </div>
              </form>
              <div class="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  class="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  class="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  class="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  class="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="ml-auto flex items-center space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={openAddUserModal}
                className="inline-flex w-1/2 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add user
              </button>

              <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={closeAddUserModal}
              />

              <a
                href="#"
                class="inline-flex w-1/2 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Export
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table class="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
                <thead class="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          class="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                        <label for="checkbox-all" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Biography
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          class="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                        <label for="checkbox-{{ .id }}" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://flowbite-admin-dashboard.vercel.app//images/users/neil-sims.png"
                        alt="Rochelle Brekke avatar"
                      />
                      <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        <div class="text-base font-semibold text-gray-900 dark:text-white">
                          Rochelle Brekke
                        </div>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
                          Jarrell20@yahoo.com
                        </div>
                      </div>
                    </td>
                    <td class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs">
                      I love working with React and Flowbites to create
                      efficient and user-friendly interfaces. In my spare time,
                      I enjoys baking, hiking, and spending time with my family.
                    </td>
                    <td class="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                      Internal Accounts Associate
                    </td>
                    <td class="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                      Burkina Faso
                    </td>
                    <td class="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                      <div class="flex items-center">
                        <div class="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>
                        Active
                      </div>
                    </td>
                    <td class="space-x-2 whitespace-nowrap p-4">
                      <button
                        type="button"
                        data-modal-toggle="edit-user-modal"
                        class="inline-flex items-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          class="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Edit user
                      </button>
                      <button
                        type="button"
                        data-modal-toggle="delete-user-modal"
                        class="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                      >
                        <svg
                          class="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Delete user
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed left-0 right-0 top-4 z-50 hidden h-modal items-center justify-center overflow-y-auto overflow-x-hidden sm:h-full md:inset-0"
        id="edit-user-modal"
        aria-hidden="true"
      >
        <div class="relative h-full w-full max-w-2xl px-4 md:h-auto">
          <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
            <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-700">
              <h3 class="text-xl font-semibold dark:text-white">Edit user</h3>
              <button
                type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="edit-user-modal"
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
            <div
              class="fixed left-0 right-0 top-4 z-50 hidden h-modal items-center justify-center overflow-y-auto overflow-x-hidden sm:h-full md:inset-0"
              id="edit-user-modal"
            >
              <div class="relative h-full w-full max-w-2xl px-4 md:h-auto">
                <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
                  <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-700">
                    <h3 class="text-xl font-semibold dark:text-white">
                      Edit user
                    </h3>
                    <button
                      type="button"
                      class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                      data-modal-toggle="edit-user-modal"
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
                            value="Bonnie"
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
                            value="Green"
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
                            value="bonnie@flowbite.com"
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
                            value="React Developer"
                            id="position"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                            placeholder="e.g. React developer"
                            required
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="current-password"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current-password"
                            value="••••••••"
                            id="current-password"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="new-password"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new-password"
                            value="••••••••"
                            id="new-password"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                            placeholder="••••••••"
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
                          >
                            👨‍💻Full-stack web developer. Open-source contributor.
                          </textarea>
                        </div>
                      </div>
                      <div class="items-center rounded-b border-t border-gray-200 p-6 dark:border-gray-700">
                        <button
                          class="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          type="submit"
                        >
                          Save all
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
