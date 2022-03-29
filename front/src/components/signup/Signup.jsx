import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import groupomania from '../../assets/icons/icon-above-font.png'
import api from '../../conf/apiConf'
import welcomeImg from '../../assets/welcome-image.jpg'
import icon from '../../assets/icons/icon.png'
import useAuth from '../../hooks/useAuth';

const Signup = () => {

    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const submit = (values, actions) => {
        const newUser = {
            username: values.name,
            email: values.email,
            password: values.password
        }
        api.post('user/signup', newUser)
            .then(res => {
                actions.setSubmitting(false)
                actions.resetForm()
                const id = res.data.userId
                const token = res.data.token
                const isAdmin = res.data.isAdmin

                const authUser = {
                    id,
                    isAdmin,
                    token
                }
                localStorage.setItem('user', JSON.stringify(authUser))
                setAuth({...res.data})
                navigate('/feed')
            })
            .catch(err => console.log(err))
    }

    const userSchema = () => Yup.object().shape({
        name: Yup.string('String').min(4, 'Trop court').max(35, 'Trop long').required('Champ requis'),
        email: Yup.string().email("L'email doit être valide").required('Champ requis'),
        password: Yup.string().required('Champ requis').matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
            "Le mot de passe doit contenir au moins 6 charactères dont au moins 1 charactère spécial, une majuscule et un chiffre"
          ),
      });
      
    return (
        <div className='flex flex-1 flex-col-reverse md:flex-row'>
            <div className='w-full relative md:w-3/5'>
                <img className='object-cover h-screen w-full' alt='presentation' src={welcomeImg}/>
                <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src={icon} alt='logo' />
            </div>
            <div className='flex flex-col w-full bg-light items-center py-8 md:w-2/5 h-screen'>
                <img className='w-2/3' alt='logo groupomania' src={groupomania} />
                <h2 className='self-start mt-16 mx-16 h-16 text-xl font-bold'>Créez votre compte</h2>
                <Formik
                    onSubmit={submit}
                    initialValues={ { name: '', email: '', password: ''} }
                    validationSchema={userSchema}
                >
                    {(  {handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched}) => (
                        <form className='w-4/5 flex flex-col gap-y-4 mt-2' onSubmit={ handleSubmit }>
                            <Field className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500 h-16' id='name' name='name' placeholder='Nom et Prénom' onChange={handleChange} onBlur={handleBlur} />
                            {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
                            <Field className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500 h-16' id='email' name='email' placeholder='Email' onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                            <Field type='password' className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500 h-16' id='password' name='password' placeholder='Mot de passe' onChange={handleChange} onBlur={handleBlur} />
                            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                            <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit' disabled={isSubmitting}>S'inscrire</button>
                        </form>
                    )}
                </Formik>
                <h2 className='self-start mt-8 mx-16 h-16 text-xl font-bold'>Déjà inscrit ?</h2>
                <Link className='w-4/5' to='/login'>
                    <button className='w-full border bg-white hover:bg-blue-400 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>Se Connecter</button>
                </Link>
            </div>
        </div>
    )
}

export default Signup