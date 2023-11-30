import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AddContestForm from './AddContestForm/AddContestForm';
import useAuth from '../../../../hooks/useAuth';
import { createdPost } from '../../../../api/creator';
import { imageUpload } from '../../../../api/utils';


const AddContest = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [selectedCategory, setSelectedCategory] = useState()

    
    const handleCategoryChange = (category) => {
      setSelectedCategory(category.name);
    };

    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const contestname = form.contestname.value
        // const category = form.person.value
        const taskSubmissionInstruction = form.taskSubmissionInstruction.value
        const price = form.price.value
        const prizeMoney = form.prize_money.value
        const description = form.description.value
        const contestDeadline = form.contestDeadline.value
        const image = form.image.files[0]
        const creator = {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        }
        const image_url = await imageUpload(image)
    
        const contestData = {
          contestname,
          category: selectedCategory,
          taskSubmissionInstruction,
          price,
          prizeMoney,
          contestDeadline,
          creator,
          description,
          image: image_url?.data?.display_url,
        //   role: 'creator',
          status: 'pending',  
        }
    
        try {
          const data = await createdPost(contestData)
          setUploadButtonText('Uploaded!')
          toast.success('Contest Added!')
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        } finally {
          setLoading(false)
        }
    
      }
      
    
      const handleImageChange = image => {
        setUploadButtonText(image.name)
      }

    return (
        <div>
            <AddContestForm
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        loading={loading}
        uploadButtonText={uploadButtonText}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
        </div>
    );
};

export default AddContest;