import React, {
    useEffect,
    useRef,
    useState
} from "react";
import Input from "../../UI/Input";
import {
    generateBase64FromImage
} from "../../../utils/image";
import {
    Form,
    json,
    useActionData,
    useNavigate
} from "react-router-dom";
import CloseSideBar from "../../UI/CloseSideBar";
import {
    AiFillDelete
} from "react-icons/ai";
import Swal from "sweetalert2";
import useHttp from "../../../hooks/use-http";
import Cookies from "js-cookie";
import {
    getAuth
} from "../../../utils/helper";

const Profile = (props) => {
        const [user, setUser] = useState(null)
        const [isEditForm, setIsEditForm] = useState(false)
        const [imagePreview, setImagePreview] = useState(null)
        const [error, setError] = useState(null)
        const fileInputRef = useRef()
        const data = useActionData()
        const navigate = useNavigate()

        const {
            isLoading: deleteIsLoading,
            error: deleteError,
            sendRequest: deleteSendRequest
        } = useHttp()

        useEffect(() => {
            setUser(props.data.user)
        }, [props.data.user])

        useEffect(() => {
            if (data && data.status === false) {
                setError(data.message)
            }
            if (data && data.status === true) {
                setError(null)
                setImagePreview(null)
                setUser(data.data.user)
            }
        }, [data])

        const showEditFormHandler = () => {
            setIsEditForm((prevState) => !prevState)
        }

        const fileChangeHandler = (e) => {
            const imageFiles = e.target.files
            if (imageFiles && imageFiles[0]) {
                generateBase64FromImage(imageFiles[0])
                    .then(b64 => {
                        setImagePreview(b64)
                    })
                    .catch(e => {
                        setImagePreview(null)
                    });
            } else {
                setImagePreview(null)
            }
        }

        const deleteAccountHandler = () => {
            Swal.fire({
                    title: "Are you sure you want to delete your account ?",
                    icon: "warning",
                    dangerMode: true,
                    confirmButtonText: 'Confirm'
                })
                .then(willDelete => {
                    if (willDelete.isConfirmed) {
                        const applyData = (data) => {
                            if (data.status === true) {
                                Cookies.remove('auth')
                                navigate('/login')
                            }
                        }
                        deleteSendRequest({
                            url: process.env.REACT_APP_API_URL + '/chat/delete/account/',
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + getAuth().token
                            }
                        }, applyData)
                    }
                });
        }

        return (
          <>
            {user && (
              <section className="p-5 overflow-y-scroll overflow-x-hidden no-scrollbar h-screen">
                <div className="mb-5 flex justify-between items-center">
                  <h1 className="text-[22px] "> My Profile </h1>{" "}
                  <CloseSideBar />
                </div>{" "}
                <div className="flex flex-col items-center w-full bg-[#36404A] p-3 rounded-lg relative overflow-hidden cursor-pointer group">
                  <span
                    className="absolute top-0 right-0 p-2 bg-[#3E4A56] rounded-lg translate-x-[110%] group-hover:translate-x-0 cursor-pointer duration-300"
                    onClick={deleteAccountHandler}
                  >
                    <AiFillDelete size={25} />{" "}
                  </span>{" "}
                  <img
                    src={user.image}
                    className="w-[120px] h-[120px] rounded-full mb-3"
                    alt=""
                  />
                  <h1 className="mb-1 text-[20px]"> {user.name} </h1>{" "}
                  <p className="text-[#ffffffa4]"> {user.email} </p>{" "}
                </div>{" "}
                <div className="h-[.5px] w-full bg-white my-5" />
                <section className="">
                  <button onClick={showEditFormHandler} className="w-full mb-6">
                    {" "}
                    EDIT PROFILE{" "}
                  </button>{" "}
                  {isEditForm && (
                    <Form
                      method="POST"
                      className="p-3 bg-[#36404A] rounded-lg mb-5"
                      encType="multipart/form-data"
                    >
                      <h1 className="text-center mb-4 text-[20px]">
                        {" "}
                        Change Your Profile{" "}
                      </h1>{" "}
                      <div className="mb-3 text-[red] text-center text-[18px]">
                        {" "}
                        {error}{" "}
                      </div>{" "}
                      {imagePreview && (
                        <div className="mb-1 bg-[#262E35] p-3 rounded-lg">
                          <img
                            src={imagePreview}
                            className=" rounded-lg w-[100px] mx-auto"
                            alt=""
                          />
                        </div>
                      )}{" "}
                      <Input
                        type="file"
                        name="image"
                        refs={fileInputRef}
                        onChange={fileChangeHandler}
                      />{" "}
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        defaultValue={user.name}
                      />{" "}
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        defaultValue={user.email}
                      />{" "}
                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        defaultValue=""
                      />
                      <div className="flex justify-between">
                        <button className="w-full"> CONFIRM </button>{" "}
                      </div>{" "}
                    </Form>
                  )}{" "}
                </section>{" "}
                {/* <button onClick={showEditFormHandler} className="w-full mb-6 bg-[red] hover:bg-[red]">DELETE ACCOUNT</button> */}{" "}
              </section>
            )}{" "}
          </>
        );
};

export default Profile;

export const action = async ({
    request,
    params
}) => {
    const formData = await request.formData()
    const response = await fetch(process.env.REACT_APP_API_URL + '/chat/update/profile', {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getAuth().token
        }
    })

    if (response.status === 422) {
        const resData = await response.json()
        return resData
    }

    if (!response.ok) {
        throw json({
            message: 'Something wrong.'
        }, {
            status: 500
        })
    }

    const resData = await response.json()
    return resData


}