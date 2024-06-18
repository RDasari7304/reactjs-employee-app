import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { employeesContext } from '../App';
import { putData, deleteData } from '../dbfunctions';

function EditEmployee({show, onHide, id, initName, initRole}) {
    const [name, setName] = useState(initName);
    const [role, setRole] = useState(initRole);
    const [employees, setEmployees] = useContext(employeesContext);

    function deleteEmployee(id){
        const updatedEmployees = employees.filter((employee) => employee.id != id);
        deleteData(`/delete/employees/${id}`);
        setEmployees(updatedEmployees);
        onHide();
    }
    function updateEmployee(id, newName, newRole){
        const updatedEmployees = employees.map((employee) => {
        if(id == employee.id){
            const updatedValues = {name: newName, role: newRole};
            const updatedEmployee = {...employee, ...updatedValues};
            putData(`/update/employees/${id}`, updatedValues);
            return updatedEmployee;
        }

        return employee
        });
    
        setEmployees(updatedEmployees)
    }

    return (
        <Modal
        show= {show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form 
                id='editModal' 
                onSubmit= {(e) => {
                    e.preventDefault(); 
                    updateEmployee(id, name, role);
                    onHide();
                }}>
                <div className='flex justify-center'>
                    <div className='flex justify-center items-center mr-5'>
                        <label htmlFor='employeeName' className='mr-2'> Employee Name: </label>
                        <input id= 'employeeName' type= 'text' placeholder='Employee Name' className='border border-gray-400 rounded-md py-1 px-2' value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <label htmlFor='employeeRole' className='mr-2'> Employee Role: </label>
                        <input id= 'employeeRole' type= 'text' placeholder='Employee Role' className='border border-gray-400 rounded-md py-1 px-2' value={role}
                        onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        <div className='flex justify-between w-full'>
            <button onClick= {() => deleteEmployee(id)} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-auto ml-5'>Delete</button>
            <div className='flex space-x-4'>
                <button form='editModal' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update</button>
                <Button variant='secondary' onClick={onHide}>Close</Button>
            </div>
        </div>
        </Modal.Footer>
        </Modal>
    );    
}

export default EditEmployee;