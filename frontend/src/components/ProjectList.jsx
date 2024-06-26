import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from './Toast.jsx';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  const editField = async (id, fieldName, fieldData) => {
    const inputValue = fieldData;
    const { value: editedData } = await Swal.fire({
      title: "Edit project " + fieldName,
      input: "text",
      inputLabel: "Project " + fieldName,
      inputValue,
      showCancelButton: true,
      inputValidator: (value) => { if (!value) return "You need to write something!" }
    });
    if (editedData) {
      axios
        .put(`http://localhost:8007/api/projects/${id}`, { [fieldName]: editedData })
        .then(res => {
          console.log('Success:', res.data);
          setProjects(projects.map(project => project.id == id ? { ...project, [fieldName]: editedData } : project));
          toast.fire({
            icon: "success",
            title: `Project id ${id} ${fieldName} changed to "${editedData}"`
          });
        })
        .catch(error => {
          console.error('Error', error);
          toast.fire({
            icon: "error",
            title: "Something unexpected happened. Please try again!"
          });
        })
    }
  }

  const deleteProject = id => {
    Swal.fire({
      title: `Do you want to delete project id ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete('http://localhost:8007/api/projects/' + id)
          .then(res => {
            console.log('Success:', res.data);
            setProjects(projects.filter(project => project.id !== id));
            toast.fire({
              icon: "success",
              title: `Successully delete project id ${id}?`
            });
          })
          .catch((error) => {
            console.error('Error:', error)
            toast.fire({
              icon: "error",
              title: "Something unexpected happened. Please try again!"
            });
          })
      }
    })
  }

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
              <td>{project.name}
                <span onClick={() => editField(project.id, "name", project.name)} className="material-symbols-outlined">edit_square</span>
              </td>
              <td>
                {project.description}
                <span onClick={() => editField(project.id, "description", project.description)} className="material-symbols-outlined">edit_square</span>
              </td>
              <td>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/"}>Add a project</Link>
    </div>
  );
}