import React, { Component } from 'react';
import axios from 'axios';
import backgroundImage from '../images/su.jpg'; // Ensure this path is correct

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
    }
    renderHeader() {
        const { user } = this.props;
        return (
            <div className="w-full bg-blue-900 bg-opacity-90 text-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl mb-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <img src={user.image || 'default-profile.png'} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
                    <div>
                        <h1 className="text-xl font-bold mt-2 text-center">{user.firstName} {user.lastName}</h1>
                        <p className="text-xl  mt-2 text-center">Status: {user.status === 'student' ? 'Student' : 'Alumni'}</p>
                        <p className="text-xl  mt-2 text-center">About: {user.about}</p>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
    renderDetails() {
        // To be overridden by subclasses
        return <div />;
    }
    render() {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-opacity-90" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="max-w-3xl w-full">
                    {this.renderHeader()}
                    {this.renderDetails()}
                </div>
            </div>
        );
    }
}

class StudentProfile extends ProfileComponent {
    renderDetails() {
        const { user } = this.props;
        return (
            <div className="w-full bg-blue-900 bg-opacity-90 text-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl p-4">
                <h2 className="text-lg font-semibold ">Personal Details</h2>
                <p>Email: {user.email}</p>
                <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p>Gender: {user.gender}</p>
                <p>Country: {user.selectedCountry}</p>
                <br/>
                <h2 className="text-lg font-semibold ">Academic Details</h2>
                <p>Department: {user.department}</p>
                <p>Graduation Year: {user.graduationYear}</p>
            </div>
          
        );
    }
}

class AlumniProfile extends ProfileComponent {
    renderDetails() {
        const { user } = this.props;
        return (
            <div className="w-full bg-blue-900 bg-opacity-90 text-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl p-4">
                <h2 className="text-lg font-semibold text-center">Personal Details</h2>
                <p>Email: {user.email}</p>
                <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p>Gender: {user.gender}</p>
                <p>Country: {user.selectedCountry}</p>
            </div>
        );
    }
}

class App extends Component {
    state = { user: {}, isLoading: true, error: null };

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }
            const response = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.setState({ user: response.data.user, isLoading: false });
        } catch (error) {
            this.setState({ error: error.response ? error.response.data.message : error.message, isLoading: false });
        }
    }

    render() {
        const { user, isLoading, error } = this.state;
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return user.status === 'student' ? <StudentProfile user={user} /> : <AlumniProfile user={user} />;
    }
}

export default App;
