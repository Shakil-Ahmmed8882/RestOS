"use client";

import { useGetUserDetailsQuery } from "@/redux/featureApi/userApi";
import { skipToken } from "@reduxjs/toolkit/query";
import type { TUserDetail } from "../types";

type Props = {
  userId: string;
};

type SingleUserResponse = {
  success?: boolean;
  message?: string;
  data?: TUserDetail;
};

export const useUserDetails = (props: Props) => {

  const { userId } = props;
  const { data, isLoading, isFetching, error, refetch } = useGetUserDetailsQuery(
    userId ? userId : skipToken,
  );

  const response = data as SingleUserResponse | undefined;
  const user = response?.data;

  return {
    userId,
    user,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
