"use client";

import { guestGuard } from "@/entities/session";
import { AuthLayout } from "@/shared/UI/Layouts/AuthLayout";

export default guestGuard(AuthLayout);
