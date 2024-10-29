import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentRegistrations() {
  const users = [
    {
      name: 'Rahul',
      email: 'rahul.patel@email.com',
      zone: 'Delhi',
      district: 'North Delhi',
      city: 'Karol Bagh'
    },
    {
      name: 'Priya',
      email: 'priya.sharma@email.com',
      zone: 'Mumbai',
      district: 'Andheri East',
      city: 'Marol'
    },
    {
      name: 'Karan',
      email: 'karan.singh@email.com',
      zone: 'Chennai',
      district: 'Tamil Nadu',
      city: 'Anna Nagar'
    },
    {
      name: 'Neha',
      email: 'nehajain@email.com',
      zone: 'Bangalore',
      district: 'Bengaluru Urban',
      city: 'Indiranagar'
    },
    {
      name: 'Amit',
      email: 'amit.kumar@email.com',
      zone: 'Hyderabad',
      district: 'Ranga Reddy',
      city: 'Madhapur'
    }
  ];

  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`/avatars/${Math.floor(Math.random() * 5 + 1)}.png`}
              alt="Avatar"
            />
            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto flex flex-col">
            {/* <span className="font-medium">{user.zone}</span> */}
            <span className="text-xs text-gray-600">{`${user.district}, ${user.city}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
