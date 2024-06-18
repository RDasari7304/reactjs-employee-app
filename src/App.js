import './App.css';
import { useEffect, useState, createContext} from 'react';
import {fetchData} from './dbfunctions.js';
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';

export const employeesContext = createContext();

function App() {
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData('/query/employees')
      .then((data) => {
        console.log(data[0]);
        const fetchedEmployees = data.map((employee) => {
          return {...employee,
            imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

          }
        });

        setEmployees(fetchedEmployees);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch employees: ', err);
        setLoading(false);
      });
  }, []);
  
  return ( 
    <employeesContext.Provider value={[employees, setEmployees]}>
      <div className="App">
        <header className="App-header">
          <div className='flex-col flex h-screen items-center justify-center'>
              {loading ?
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" /> 
                    :
                    <div className="bg-white py-24 sm:py-32 min-w-full flex justify-center items-center">

                      <div className="flex px-10 ">

                        <div className="max-w-2xl">
                          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                          <p className="mt-6 text-lg leading-8 text-gray-600">
                            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
                            suspendisse.
                          </p>
                        </div>

                        <ul role="list" className="grid ml-10 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                          {employees ? 
                              employees.map(({id, name, role, imageUrl}) => {
                                return <Employee key ={id} id= {id} name={name} role={role} imageUrl={imageUrl}/>
                              })
                              :
                              <></>
                          }
                        </ul>
                        
                      </div>

                    </div>
              }
              <AddEmployee/>
            </div>
        </header>
      </div>
    </employeesContext.Provider>
  );
}

export default App;
