export const mockLogin = ({ username, password }) => {
    // Mock users
    const users = [
      { id: 1, username: "admin", password: "admin123", role: "ADMIN", name: "Admin User" },
      { id: 2, username: "teacher", password: "teacher123", role: "TEACHER", name: "Teacher User" }
    ];
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          // Return mock token
          resolve({ user: { id: user.id, username: user.username, role: user.role, name: user.name }, token: "mock-jwt-token" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500); // simulate network delay
    });
  };
  