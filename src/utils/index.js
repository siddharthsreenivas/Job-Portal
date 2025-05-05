
export const recruiterOnBoardFormControls = [
	{
		label: "Name",
		name: "name",
		placeholder: "Enter your name",
		componentType: "input",
        id: 1
	},
	{
		label: "Company Name",
		name: "companyName",
		placeholder: "Enter your company name",
		componentType: "input",
        id: 2
	},
	{
		label: "Company Role",
		name: "companyRole",
		placeholder: "Enter your company role",
		componentType: "input",
        id: 3
	},
];

export const initialRecruiterFormData = {
	name: "",
	companyName: "",
	companyRole: "",
};

export const candidateOnBoardFormControls = [
	{
		label: "Resume",
		name: "resume",
		componentType: "file",
		id: 0,
	},
	{
		label: "Name",
		name: "name",
		placeholder: "Enter your name",
		componentType: "input",
		id: 1,
	},
	{
		label: "Current Company ",
		name: "currentCompany",
		placeholder: "Enter your current company ",
		componentType: "input",
		id: 2,
	},
	{
		label: "Current Job Location",
		name: "currentJobLocation",
		placeholder: "Enter your current job location",
		componentType: "input",
		id: 3,
	},
	{
		label: "Prefered Job Location",
		name: "preferedJobLocation",
		placeholder: "Enter your prefered job location",
		componentType: "input",
		id: 15,
	},
	{
		label: "Current Salary",
		name: "currentSalary",
		placeholder: "Enter your current salary",
		componentType: "input",
		id: 4,
	},
	{
		label: "Notice Period",
		name: "noticePeriod",
		placeholder: "Enter your notice period",
		componentType: "input",
		id: 5,
	},
	{
		label: "Skills",
		name: "skills",
		placeholder: "Enter your skills",
		componentType: "input",
		id: 6,
	},
	{
		label: "Previous Companies ",
		name: "previousCompanies",
		placeholder: "Enter your previous companies ",
		componentType: "input",
		id: 7,
	},
	{
		label: "Total Experience ",
		name: "totalExperience",
		placeholder: "Enter your total experience ",
		componentType: "input",
		id: 8,
	},
	{
		label: "College",
		name: "college",
		placeholder: "Enter your college name",
		componentType: "input",
		id: 9,
	},
	{
		label: "College Location",
		name: "collegeLocation",
		placeholder: "Enter your college location",
		componentType: "input",
		id: 10,
	},
	{
		label: "Graduated Year ",
		name: "graduatedYear",
		placeholder: "Enter your graduated year ",
		componentType: "input",
		id: 11,
	},
	{
		label: "Linkedin Profile ",
		name: "linkedinProfile",
		placeholder: "Enter your linkedin profile ",
		componentType: "input",
		id: 12,
	},
	{
		label: "Github Profile ",
		name: "githubProfile",
		placeholder: "Enter your github profile ",
		componentType: "input",
		id: 13,
	},
];

export const initialCandidateFormData = {
	resume: "",
	name: "",
	currentJobLocation: "",
	preferedJobLocation: "",
	currentSalary: "",
	noticePeriod: "",
	skills: "",
	currentCompany: "",
	previousCompanies: "",
	totalExperience: "",
	college: "",
	collegeLocation: "",
	graduatedYear: "",
	linkedinProfile: "",
	githubProfile: "",
};

// export const initialCandidateAccountFormData = {
// 	name: "",
// 	currentJobLocation: "",
// 	preferedJobLocation: "",
// 	currentSalary: "",
// 	noticePeriod: "",
// 	skills: "",
// 	currentCompany: "",
// 	previousCompanies: "",
// 	totalExperience: "",
// 	college: "",
// 	collegeLocation: "",
// 	graduatedYear: "",
// 	linkedinProfile: "",
// 	githubProfile: "",
// };

export const postNewJobFormControls = [
	{
		label: "Company Name",
		name: "companyName",
		placeholder: "Company Name",
		componentType: "input",
		disabled: true,
		id: 1
	},
	{
		label: "Job Title",
		name: "title",
		placeholder: "Enter job title",
		componentType: "input",
		id: 2
	},
	{
		label: "Job Type",
		name: "type",
		placeholder: 'Enter job type',
		componentType: "input",
		id: 3
	},
	{
		label: "Location",
		name: "location",
		placeholder: 'Enter job location',
		componentType: "input",
		id: 4
	},
	{
		label: "Experience",
		name: "experience",
		placeholder: 'Enter experience required',
		componentType: "input",
		id: 5
	},
	{
		label: "Description",
		name: "description",
		placeholder: 'Enter job description',
		componentType: "input",
		id: 6
	},
	{
		label: "Skills Required",
		name: "skills",
		placeholder: 'Enter job skills needed',
		componentType: "input",
		id: 7
	}
	
]

export const initialPostNewJobFormData = {
	companyName: "",
	title: '',
	type: '',
	location: '',
	experience: '',
	description: '',
	skills: ''
}