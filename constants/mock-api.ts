////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

// Define the shape of User data

type Gender = 'male' | 'female';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ['male', 'female'];
      const jobs = [
        'Software Engineer',
        'Data Scientist',
        'Marketing Manager',
        'Graphic Designer',
        'Sales Manager',
        'Member Manager'
      ];
      const cities = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
        'Austin',
        'Jacksonville'
      ];
      const states = [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan'
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: 'USA',
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: '1980-01-01', to: '2000-01-01' })
          .toISOString()
          .split('T')[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    genders = [],
    search
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected genders
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          'first_name',
          'last_name',
          'email',
          'job',
          'city',
          'street',
          'state',
          'country'
        ]
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split('.') : [];
    console.log('gendersArray', gendersArray);
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

// Initialize sample users
fakeUsers.initialize();

export type Member = {
  id: string;
  profile_picture: string;
  name: string;
  mobile_number: string;
  agent_code: string;
  zone: string;
  division: string;
  branch: string;
  created_at: string;
  updated_at: string;
};
// Mock member data store
export const fakeMembers = {
  records: [] as Member[], // Holds the list of member objects

  // Initialize with sample data
  initialize() {
    const sampleMembers: Member[] = [];
    function generateRandomMemberData(id: number): Member {
      const divisions = ['Gorakhpur', 'Varanasi', 'Lucknow'];
      const gorakhpurBranches = [
        'Gorakhpur Main Branch',
        'Civil Lines Branch',
        'Golghar Branch'
      ];

      const division = faker.helpers.arrayElement(divisions);

      return {
        id: faker.string.uuid(),
        profile_picture: `https://i.pravatar.cc/300`,
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        mobile_number: faker.phone.number(),
        agent_code: `AG${faker.number.int({ min: 10000, max: 99999 })}`,
        zone: 'Kanpur',
        division: division,
        branch:
          division === 'Gorakhpur'
            ? faker.helpers.arrayElement(gorakhpurBranches)
            : `${division} Main Branch`,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleMembers.push(generateRandomMemberData(i));
    }

    this.records = sampleMembers;
  },

  // Get all members with optional category filtering and search
  async getAll({
    divisions = [],
    search
  }: {
    divisions?: string[];
    search?: string;
  }) {
    let members = [...this.records];

    // Filter members based on selected divisions
    if (divisions.length > 0) {
      members = members.filter((member) => divisions.includes(member.division));
    }

    // Search functionality across relevant insurance agent fields
    if (search) {
      members = matchSorter(members, search, {
        keys: ['name', 'agent_code', 'mobile_number', 'division', 'branch']
      });
    }

    return members;
  },

  // Get paginated results with optional category filtering and search
  async getMembers({
    page = 1,
    limit = 10,
    divisions,
    search
  }: {
    page?: number;
    limit?: number;
    divisions?: string;
    search?: string;
  }) {
    await delay(1000);
    const divisionsArray = divisions ? divisions.split('.') : [];
    const allMembers = await this.getAll({
      divisions: divisionsArray,
      search
    });
    const totalMembers = allMembers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedMembers = allMembers.slice(offset, offset + limit);

    // Current time for response
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: 'Insurance agents data retrieved successfully',
      total_members: totalMembers,
      offset,
      limit,
      members: paginatedMembers
    };
  },

  // Get a specific member by its ID
  async getMemberById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the member by its ID
    const member = this.records.find((member) => member.id === id.toString());

    if (!member) {
      return {
        success: false,
        message: `Member with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Member with ID ${id} found`,
      member
    };
  }
};

// Initialize sample members
fakeMembers.initialize();
