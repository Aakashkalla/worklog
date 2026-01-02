import React from 'react'
import { createProject } from './actions'

const Project = () => {
  return (
    <main className="p-6">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <form action={createProject} className="mt-4 flex gap-2">
            <input
            name="projectName"
            type="text"
            placeholder="Project name"
            className="border py-2 rounded w-64 placeholder:text-neutral-500 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            />
            <button className="border px-4 py-2 rounded cursor-pointer">
            Add
            </button>
        </form>

        <div className="mt-6">
        <p className="text-gray-500">No projects yet</p>
        </div>
    </main>
  )
}

export default Project
