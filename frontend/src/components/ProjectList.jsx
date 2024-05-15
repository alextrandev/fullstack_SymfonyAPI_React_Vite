import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8007/api/projects')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          console.error('Expected an array, but got:', res.data);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleEdit = projectId => {
    // Need work: handle edit
    console.log('To do: edit project with id ', projectId);
  };

  const handleDelete = projectId => {
    axios
      .delete('http://localhost:8007/api/projects/' + projectId)
      .then(res => {
        console.log('Success:', res.data);
        setProjects(projects.filter(project => project.id !== projectId))
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className='projects_container'>
      <h1>Project List</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleEdit(project.id)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/"}>Add a project</Link>
    </div>
  );
}