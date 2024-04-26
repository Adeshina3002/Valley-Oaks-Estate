import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const data = users.map((user) => {
      const { password, ...usersData } = user;
      return usersData;
    });

    res.status(200).json({ message: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get Users' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    const { password, ...userData } = user;

    res.status(200).json({ message: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get User' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  const { password, avatar, ...userInput } = req.body;

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // compare the id from request params with the id from the request payload
    if (id !== tokenUserId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...userInput,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...userData } = updatedUser;

    res.status(200).json({ message: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update User' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenUserId = req.userId;

    // compare the id from request params with the id from the request payload
    if (id !== tokenUserId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({ message: "User deleted " })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete User' });
  }
};
