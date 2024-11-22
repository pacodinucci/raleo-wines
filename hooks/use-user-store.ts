import { create } from "zustand";
import axios from "axios";
import { User } from "@prisma/client";

interface UserStoreProps {
  user: {};
  getUser: () => Promise<void>;
}
