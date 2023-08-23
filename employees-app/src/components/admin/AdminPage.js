import axios from "axios";
import "./AdminPage.css";
import editButton from '../../assets/edit-button.svg'
import deleteButton from '../../assets/delete.svg'
import React, { useEffect, useState } from 'react'
import PaginationComponent from "../pagination/PaginationComponent";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AdminPage = () => {
    let {register,formState:{errors},getValues,setValue}=useForm()
    //read token from browser storage
    let token = sessionStorage.getItem("token")
    //Items to be displayed in apge
    let itemsPerPage = 10

    let [roles,setRoles]=useState([])

    const getRoles = async()=>{
        let response = await axios.get("http://localhost/admin/roles",{
            headers:{
                Authorization:`Bearer ${token}`
    }}) 
    //Update roles state with data from API
     setRoles(response.data.payload)
    }

    //state for modal
    let [show,setShow]=useState()

    //function to open model
    const openModal=()=>setShow(true)

    //function close model
    const closeModal=()=>setShow(false)

    const handleEdit = async (user) => {
        // setValue("project_name",project.project_name)
        setValue("userId",user.id)
        // setValue("start_date",project.start_date.toString().slice(0,10))
        // setValue("client",project.client)
        // setValue("domain",project.domain)
        openModal()

    }
    //Save changes
    const saveChanges =async () =>{
          closeModal()
          
          let modifiedRole = getValues()
          console.log(modifiedRole);
        console.log(token);
          let res = await axios.put(`http://localhost/admin/user/${modifiedRole.userId}/role/${modifiedRole.role}`,{},{headers:{
            Authorization:`Bearer ${token}`
          }})
          console.log(res);
          getData()
        //   console.log(res);
      }

    //State to store users from the response
    let [users,setUsers] = useState([])
    //state to store usrs of current page
    let [currentUsers,setCurrentUsers] = useState([])

    let [currentPage,setCurrentPage] = useState(0)

    let [selectAllStatus,setSelectAllStatus] = useState(false)
   
    // console.log("...........",users);


    //Get data from backend
    let getData = async() =>{
        let response = await axios.get("http://localhost/admin/users",{
            headers:{
                Authorization:`Bearer ${token}`
    }}) 
    //Update users state with data from API
     setUsers(response.data.payload)
    }

    //Code to execute after first rendering of the Component
    useEffect(()=>{
        getData() 
        getRoles()       
    },[])

    //Handle Select All and de-select all
    const handleChange = (event)=>{
        //While checking the checkbox
        setSelectAllStatus(true)
        if(event.target.checked===true){
            let newUsers = currentUsers.filter((user)=>{
            user.clickStatus=true
            return user})
            setCurrentUsers(newUsers)
            console.log(currentUsers);
        }
        //While Unchecking the checkbox
        else{
            let newUsers = currentUsers.filter((user)=>{user.clickStatus=false
                return user})
                setCurrentUsers(newUsers)
                console.log(currentUsers);
        }
        console.log(currentUsers);
        setSelectAllStatus(false)
    }

    //function to handle a selected user
    const handleSelectUser = (event, email) =>{
        // console.log(event, email);
        if(event.target.checked===true){
            let newUsers = currentUsers.filter((user)=>{
                if(user.email===email)
                user.clickStatus=true
            return user})

            setCurrentUsers(newUsers)
            console.log(currentUsers);
        }
        //While Unckecking the checkbox
        else{
            let newUsers = currentUsers.filter((user)=>{
                if(user.email===email)
                user.clickStatus=false
                return user})

                setCurrentUsers(newUsers)
                console.log(currentUsers);
        }
        console.log(currentUsers);
    }


    //Delete selected users
    const deleteSelectedUsers = () => {
        let selectedUsers = []

        //Getting list of selected users
        currentUsers.map((user) =>{
            if(user.clickStatus===true)
             selectedUsers.push(user.email)
        })
        console.log("selected users are ",selectedUsers);

        //Users after deletion
        let updatedUsers = users.filter((user=>{
            let emailFound = false
            for (let index = 0; index < selectedUsers.length; index++) {
                if(user.email===selectedUsers[index])
                {
                    emailFound=true
                    break
                }  
            }
            if(emailFound===false)
            return user
        }))

        console.log(updatedUsers);
        //update users list
        setUsers(updatedUsers)
        refreshUsers()

    }

    //Function to handle delete user
    const handledeleteUser = (email) =>{
        let updatedUsers = users.filter((user=>user.email!==email && user))
        setUsers(updatedUsers)
        
    }

    //Handle search
    const handleSearch = async (event) => {
        console.log(event.target.value);
        let response = await axios.get(`http://localhost/admin/users/${event.target.value}`,{headers:{
        Authorization:`Bearer ${token}`
        }})

        setUsers(response.data.payload)
        console.log(users);
    }

    //Refresh current users 
    const refreshUsers = ()=>{
        let updatedCurrentUsers = currentUsers.filter((user)=>{
            user.clickStatus=false
            return user
        })
        console.log(updatedCurrentUsers);
        setCurrentUsers(updatedCurrentUsers)
        setSelectAllStatus(false)
        console.log(selectAllStatus);
         
    }

    useEffect(()=>{
        refreshUsers()
    },[currentPage])
   

  return (
    <div className='container'>
        <div className='m-3'>
                <input className='form-control' type='text' placeholder='Search by name, email or role' onChange={handleSearch}/>
        </div>

        <div style={{minHeight:"80vh"}}>
            <table className='table mytable'>
                <thead>
                    <tr className='table_rows'>
                        {selectAllStatus || <th><input style={{width:"15px",height:"15px",cursor:"pointer"}} defaultChecked={ selectAllStatus && "checked"} type="checkbox" onClick={handleChange}/></th>}
                        <th >Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Display users of current page
                        currentUsers.map((user,index)=>(
                            <tr key={index} >
                                <td className={user.clickStatus===true?"selectedField":""}>
                                    <input style={{width:"15px",height:"15px",cursor:"pointer"}} 
                                    type="checkbox" defaultChecked={user.clickStatus && "checked"}
                                    onClick={(event)=>handleSelectUser(event,user.email)}/>
                                    </td>
                                <td className={user.clickStatus===true?"selectedField":""}>{user.name}</td>
                                <td className={user.clickStatus===true?"selectedField":""}>{user.email}</td>
                                <td className={user.clickStatus===true?"selectedField":""}>{user.role?user.role:"---"}</td>
                                <td className={user.clickStatus===true?"selectedField":""}>
                                    <img src={editButton} height="20px" width="20px" style={{marginRight:"20px",cursor:"pointer"}} onClick={()=>handleEdit(user)}/>
                                    
                                    <img src={deleteButton} height="30px" width="30px" style={{cursor:"pointer"}} onClick={()=>handledeleteUser(user.email)}/>
                                </td>
                                
                            </tr>
                        ))

                    }
                    
                    
                </tbody>
                
            </table>

            <Modal show={show} onHide={closeModal} backdrop="static">
                                        <Modal.Header closeButton>
                                        <Modal.Title>Edit Employee Role</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <form className='form'>
                                                <input {...register("userId")} hidden/>
                                                {/* Role input  */}
                                                <div className='m-3'>
                                                    <select className='form-control' {...register("role",{required:"Role is required"})} defaultValue="default1">
                                                        <option value="default1">-- Select Role --</option>
                                                        {roles.map((role)=>(
                                                                <option key={role.id} value={role.id}>{role.roleName}</option>
                                                        ))}
                                                    </select>
                                                    {errors.role && <p className='text-danger text-start ms-2'>{errors.role.message}</p>}
                                                </div>

                                        </form>
                                        
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={closeModal}>
                                            Close
                                        </Button>
                                        <Button variant="success" onClick={saveChanges}>
                                            Save Changes
                                        </Button>
                                        </Modal.Footer>
                            </Modal> 
            
            </div>
            <div className="row">
                <div className="col-4">

            <button className="btn btn-danger " onClick={deleteSelectedUsers}>Delete Selected</button>
                </div>
                <div className="col-8 justify-content-center">
                   <PaginationComponent items={users} setCurrentItems={setCurrentUsers} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>

            </div> 
            
        
    </div>
  )
}

export default AdminPage