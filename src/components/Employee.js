import { useState } from "react";
import EditEmployee from "./EditEmployee";

const Employee = ({id, name, role, imageUrl, updateEmployee}) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <EditEmployee show= {showModal} onHide={() => setShowModal(false)} id= {id} initName={name} initRole={role}/>
            <li key={name} className="ml-5 cursor-pointer" onClick={() => {setShowModal(true); console.log(showModal)}}>
                <div className="flex items-center gap-x-6">
                    <img className="h-16 w-16 rounded-full" src={imageUrl} alt="" />
                    <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{name}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">{role}</p>
                    </div>
                </div>
            </li>
        </>
    );
}

export default Employee