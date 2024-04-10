import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [status, setStatus] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [about, setAbout] = useState('');

  const departments = [
    'College of Arts and Sciences',
    'College of Engineering and Computer Science',
    'College of Visual and Performing Arts',
    'David B. Falk College of Sport and Human Dynamics',
    'Martin J. Whitman School of Management',
    'Maxwell School of Citizenship and Public Affairs',
    'S.I. Newhouse School of Public Communications',
    'School of Education',
    'School of Information Studies'
  ];

  const subjectsMap = {
    'College of Arts and Sciences': [
      'African American Studies',
      'Art and Music Histories',
      'Biology',
      'Biotechnology',
      'Chemistry',
      'Communication Sciences and Disorders',
      'Earth and Environmental Sciences',
      'English',
      'Languages, Literatures and Linguistics',
      'Mathematics',
      'Neuroscience',
      'Philosophy',
      'Physics',
      'Psychology',
      'Religion',
      'Science Teaching',
      'Women\'s and Gender Studies',
      'Writing Studies, Rhetoric, and Composition'
    ],
    'College of Engineering and Computer Science': [
      'Biomedical and Chemical Engineering',
      'Civil and Environmental Engineering',
      'Electrical Engineering and Computer Science',
      'Mechanical and Aerospace Engineering'
    ],
    'College of Visual and Performing Arts': [
      'Communication and Rhetorical Studies',
      'Drama',
      'Film and Media Arts'
    ],
    'David B. Falk College of Sport and Human Dynamics': [
      'Exercise Science',
      'Human Development and Family Science',
      'Marriage and Family Therapy',
      'Nutrition and Food Studies',
      'Public Health',
      'Sport Management'
    ],
    'Martin J. Whitman School of Management':[
      'Accounting',
      'Business Analytics',
      'Entrepreneurship and Emerging Enterprises',
      'Finance',
      'Management',
      'Marketing',
      'Real Estate',
      'Retail Management',
      'Supply Chain Management'
    ],
    'Maxwell School of Citizenship and Public Affairs': [
      'Anthropology',
      'Economics',
      'Geography and the Environment',
      'History',
      'International Relations',
      'Political Science',
      'Public Administration and International Affairs',
      'Social Science',
      'Sociology'
    ],
    'S.I. Newhouse School of Public Communications': [
      'Advertising',
      'Arts Journalism',
      'Audio Arts',
      'Broadcast and Digital Journalism',
      'Communications Management',
      'Communications@Syracuse',
      'Magazine',
      'Magazine, Newspaper, and Online Journalism',
      'Mass Communications',
      'Media Studies',
      'Multimedia Photography and Design',
      'Newspaper and Online Journalism',
      'Public Diplomacy',
      'Public Relations',
      'Television, Radio, and Film'
    ],
    'School of Education':[
      'Counseling and Human Services',
      'Cultural Foundations of Education',
      'Higher Education',
      'Instructional Design, Development and Evaluation',
      'Reading and Language Arts',
      'Teaching and Leadership'
    ],
    'School of Information Studies': [
      'Data Analytics',
      'Information Management and Technology',
      'Innovation, Society and Technology',
      'Library and Information Science'
    ]
    
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries.');
      }
      const data = await response.json();
      const countryNames = data.map(country => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData() 
        formData.append("firstName",firstName)
        formData.append("lastName",lastName)
        formData.append('dateOfBirth',dateOfBirth)
        formData.append('gender',gender)
        formData.append('department',department)
        formData.append('subject',subject)
        formData.append('status',status)
        formData.append('email',email)
        formData.append('selectedCountry',selectedCountry)
        formData.append('about',about)
        formData.append('image',image)
        formData.append('password',password)
        formData.append('confirmPassword',confirmPassword)
      ;
     console.log(formData,axios)
     const response = await axios.post('/register', formData,{ headers: {'Content-Type': 'multipart/form-data'}});
     const data = response.data;
  
      if (data.error) {
        toast.error(data.error);
      } else {
        // Clear form fields or redirect
        setFirstName('');
        setLastName('');
        setDateOfBirth(null);
        setGender('');
        setDepartment('');
        setSubject('');
        setStatus('');
        setEmail('');
        setSelectedCountry('');
        setAbout('');
        setImage(null);
        setPassword('');
        setConfirmPassword('');
        toast.success('Registration successful. Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error.message);
    }
 console.log('Form submitted:', { firstName, lastName, dateOfBirth, gender, department, subject, status, email, selectedCountry,about });
  };
  return (
    <div className="container mx-auto mt-8 ">
      <h1 className="text-3xl font-semibold text-center mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-200 p-6 rounded-lg border-2 border-black">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName"  name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status"  name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">Select status</option>
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-mention">Prefer not to mention</option>
          </select>
        </div>
        <div className="mb-4">
  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Select a Country:</label>
  <div className="relative">
    <select
      id="country"
      name="country"
      value={selectedCountry}
      onChange={handleCountryChange}
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option value="">Select a country</option>
      {countries.map((countryName, index) => (
        <option key={index} value={countryName}>{countryName}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
</div>
<div className="mb-4">
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">About Yourself</label>
          <input type="text" name="about" id="about" value={about} onChange={(e) => setAbout(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <select id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">Select Department</option>
            {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">Select Subject</option>
            {subjectsMap[department] && subjectsMap[department].map((subj) => <option key={subj} value={subj}>{subj}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image (only .jpg format)</label>
          <input type="file"  name="image" id="image" onChange={(e) => setImage(e.target.files[0])} className="mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email"  name="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-indigo-600">
          <FaArrowLeft className="mr-1" />
          Back
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register