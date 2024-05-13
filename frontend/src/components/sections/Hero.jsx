import React from 'react';
import Hero1 from '../../assets/images/Hero1Image.png';
import ButtonAll from '../common/ButtonAll';

const Hero = () => {
    const handleAppointment = () => {
        console.log('Appointment');
    };

    return (
        <div className='container mx-auto mt-16 min-w-full'>
            <div className='bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg overflow-hidden'>
                <div className='flex p-10 items-center justify-between'>
                    <div className='w-1/2 pr-12'>
                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>❤️ Health Comes First</h3>
                        <h1 className='text-4xl font-bold text-gray-900 mb-6'>Find Your Doctor and Make an Appointment</h1>
                        <p className='text-gray-700 mb-8'>Talk to online doctors and get medical advice, prescriptions, refills, and medical notes within minutes. On-demand healthcare services at your fingertips.</p>
                        <ButtonAll onClick={handleAppointment} children='Book Appointment' />
                        <div className='mt-8'>
                            <div className='flex justify-between'>
                                <div className='text-center'>
                                    <p className='text-3xl font-bold text-blue-600'>145k+</p>
                                    <p className='text-gray-700'>Receive Patients</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-3xl font-bold text-blue-600'>50+</p>
                                    <p className='text-gray-700'>Expert Doctors</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-3xl font-bold text-blue-600'>10+</p>
                                    <p className='text-gray-700'>Years of Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <img src={Hero1} alt="Hero Image" className='w-full rounded-lg shadow-xl' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
