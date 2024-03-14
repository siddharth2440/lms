import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Carousel } from 'react-responsive-carousel'

const AboutUs = () => {

    const celebrities = [
        {
            title:"Nelson Mandela",
            description:'Education is the most powerful tool you can use to change the world. ',
            image:"https://www.mandela.ac.za/www-new/media/Store/images/About/Mandela/Mandela-4.jpg",
        },
        {
            title:"Albert Einstein",
            description:'Education is the most powerful tool you can use to change the world. ',
            image:"https://assets-global.website-files.com/63a5141427f93656e3af9e76/63f52a0b6fb5396dce0d9f83_Why%20we%20made%20Digital%20Einstein%20-%20UneeQ%20blog.jpg",
        },
        {
            title:"Bill Gates",
            description:'Education is the most powerful tool you can use to change the world. ',
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJzkRWtk1wPBrtGjf8V7V5Yz-YgtxF4Xa4g&usqp=CAU",
        },
        {
            title:"Dr. APJ Abdul Kalam",
            description:'Education is the most powerful tool you can use to change the world. ',
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dUBRh9YTDOssUi9TATN31PLvVMts284rrg&usqp=CAU",
        },
        {
            title:"Adolf Hitler",
            description:'Education is the most powerful tool you can use to change the world. ',
            image:"https://images.theconversation.com/files/193819/original/file-20171108-14177-a1lv3m.png?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
        }
    ]
  return (
    <HomeLayout>
        <div className='px-[4rem] py-5 flex flex-col items-start justify-start gap-2'>
            <section className='grid grid-cols-2 mt-[3rem] py-6 px-3'>
                <div className='flex flex-col items-center justify-center gap-3 w-[70%] pt-[1.4rem]'>
                    <h1 className='text-yellow-500 font-[500] text-[2.5rem] tracking-light'>Affordable and Quality Education</h1>
                    <p className='text-[1rem] font-[500]'>Our goal is to provide the affordable and quality education to the world.
                        We are providing the platform the platform for the aspiring teachers and students to
                        share their skills, creativity and knowledge to each other to empower 
                        and contribute in the growth and wellness of mankind   
                    </p>
                </div>
                <div>
                    <img className='mx-auto rounded-lg shadow-lg saturate-200 h-[100%]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJzkRWtk1wPBrtGjf8V7V5Yz-YgtxF4Xa4g&usqp=CAU" alt="" />
                </div>
            </section>
        </div>

    </HomeLayout>
  )
}

export default AboutUs