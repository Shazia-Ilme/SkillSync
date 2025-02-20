import React, { useState } from 'react';
import { BookOpen, Clock, Users, Brain, ArrowRight, Sparkles, MapPin, GraduationCap, Code, Star } from 'lucide-react';

type Subject = {
  name: string;
  level: string;
  domain: string;
};

type StudyPreference = {
  timeOfDay: string;
  duration: string;
  frequency: string;
  location: string;
  mode: string;
};

type UserProfile = {
  branch: string;
  year: string;
  interests: string[];
};

function App() {
  const [step, setStep] = useState(1);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({ name: '', level: 'beginner', domain: 'technology' });
  const [preferences, setPreferences] = useState<StudyPreference>({
    timeOfDay: '',
    duration: '',
    frequency: '',
    location: '',
    mode: 'hybrid'
  });
  const [profile, setProfile] = useState<UserProfile>({
    branch: '',
    year: '',
    interests: []
  });

  const domains = [
    'Technology', 'Science', 'Engineering', 'Mathematics', 'Business',
    'Arts', 'Humanities', 'Social Sciences', 'Medicine', 'Law'
  ];

  const branches = [
    'Computer Science', 'Mechanical Engineering', 'Electrical Engineering',
    'Civil Engineering', 'Information Science Engineering', 'Business Administration',
    'Medicine', 'Law', 'Arts & Design', 'Natural Sciences'
  ];

  const locations = [
    'University Library', 'Study Hall', 'Campus Center',
    'Virtual', 'Cafe', 'Research Lab','Flexible/Any'
  ];

  const handleAddSubject = () => {
    if (newSubject.name) {
      setSubjects([...subjects, newSubject]);
      setNewSubject({ name: '', level: 'beginner', domain: 'technology' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const ProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {['Profile', 'Subjects', 'Preferences', 'Matching'].map((label, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index + 1 === step ? 'text-indigo-600' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              index + 1 === step ? 'bg-indigo-600 text-white' : 
              index + 1 < step ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}>
              {index + 1 < step ? '✓' : index + 1}
            </div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">StudyMatch AI</h1>
          </div>
          <p className="text-gray-600 text-xl">Find your perfect study group match with AI</p>
        </header>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <ProgressBar />

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-indigo-600" />
                Your Academic Profile
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch of Study
                  </label>
                  <select
                    value={profile.branch}
                    onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select your branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={profile.year}
                    onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                    <option value="5">Graduate</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                Next Step
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                What do you want to study?
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="Enter a subject"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <select
                    value={newSubject.domain}
                    onChange={(e) => setNewSubject({ ...newSubject, domain: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {domains.map((domain) => (
                      <option key={domain} value={domain.toLowerCase()}>{domain}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <select
                    value={newSubject.level}
                    onChange={(e) => setNewSubject({ ...newSubject, level: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button
                    onClick={handleAddSubject}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0"
                  >
                    Add Subject
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-700">{subject.name}</span>
                        <div className="text-sm text-gray-500">
                          <span className="capitalize">{subject.domain}</span> • {subject.level}
                        </div>
                      </div>
                      <Code className="w-5 h-5 text-indigo-600" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-indigo-600" />
                Study Preferences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time of Day
                  </label>
                  <select
                    value={preferences.timeOfDay}
                    onChange={(e) => setPreferences({ ...preferences, timeOfDay: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (6 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 10 PM)</option>
                    <option value="night">Night (10 PM - 6 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Study Session Duration
                  </label>
                  <select
                    value={preferences.duration}
                    onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1h">1 hour</option>
                    <option value="2h">2 hours</option>
                    <option value="3h">3 hours</option>
                    <option value="4h">4+ hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Location
                  </label>
                  <select
                    value={preferences.location}
                    onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location} value={location.toLowerCase()}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Study Mode
                  </label>
                  <select
                    value={preferences.mode}
                    onChange={(e) => setPreferences({ ...preferences, mode: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="inperson">In-Person Only</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="hybrid">Hybrid (Both)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Study Frequency
                  </label>
                  <select
                    value={preferences.frequency}
                    onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">2-3 times per week</option>
                    <option value="biweekly">Every other week</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  Find My Study Group
                  <Users className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <Sparkles className="w-16 h-16 text-indigo-600 animate-pulse" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Finding Your Perfect Study Matches
              </h2>
              <p className="text-gray-600">
                Our AI is analyzing your profile and preferences to connect you with the most compatible study partners.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                    Academic Profile
                  </h3>
                  <ul className="space-y-2 text-left">
                    <li className="text-gray-700">Branch: {profile.branch}</li>
                    <li className="text-gray-700">Year: {profile.year}</li>
                    <li className="text-gray-700">Subjects: {subjects.length}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                    Study Preferences
                  </h3>
                  <ul className="space-y-2 text-left">
                    <li className="text-gray-700">Time: {preferences.timeOfDay}</li>
                    <li className="text-gray-700">Duration: {preferences.duration}</li>
                    <li className="text-gray-700">Mode: {preferences.mode}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                You'll receive notifications when we find suitable study partners matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;