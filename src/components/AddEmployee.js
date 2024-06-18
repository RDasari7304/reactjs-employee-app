import { useState, useContext } from "react";
import { postData } from "../dbfunctions.js";
import { employeesContext } from "../App";


function AddEmployee(){
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [showNameError, setShowNameError] = useState(false);
    const [showRoleError, setShowRoleError] = useState(false);
    const [employees, setEmployees] = useContext(employeesContext);
    
    function addEmployee(name, role){
        const employee = {
          name: name, 
          role: role
        }
        
        postData('/insert/employees', employee);
        setEmployees([...employees, {id: employees.length, ...employee,
          imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }]);
    }

    function clearFields(){
        setName("");
        setRole("");
    }

    function validateData(){
        let isValid = true;

        if(!name){
            setShowNameError(true);
            setTimeout(() => setShowNameError(false), 500);
            isValid = false;
        }

        if(!role){
            setShowRoleError(true);
            setTimeout(() => setShowRoleError(false), 500);
            isValid = false;
        }

        return isValid;
    }

    return (
        <form 
            id = 'addForm'
            onSubmit={(e) => {
                e.preventDefault();
                if(validateData()){
                    addEmployee(name, role);
                    clearFields();
                }
            }}
        >
            <div className= 'min-w-full flex justify-center m-5'>
                <>  
                    <input id='nameInput' type='text' placeholder='Input employee name' className={`shadow-lg p-4 ml-2 mr-2 rounded-lg min-h-4 max-h-4 ${showNameError ? 'placeholder-red-500 animate-bounce' : ''}`} value= {name} onChange={(e) => setName(e.target.value)}/>
                    <input type='text' placeholder='Input employee role' className={`shadow-lg p-4 ml-2 mr-2 rounded-lg min-h-4 max-h-4 ${showRoleError ? 'placeholder-red-500 animate-bounce' : ''}`} value= {role} onChange={(e) => setRole(e.target.value)}/>
                </>
                
                <button form='addForm' className="rounded-md ml-2 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 poabsolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Add Employee</button>
            
            </div>
        </form>
    );
}

export default AddEmployee