import { AxiosResponse } from "axios";
import { apiClient } from "../../config/axios";
import { RegisterInitPayload, RegisterInitResponse, LoginVerifyOtpPayload, LoginVerifyOtpResponse, RestaurantApiResponse } from "../../types/login";

export async function registerInit(
    payload: RegisterInitPayload
): Promise<RegisterInitResponse> {
    try {
        console.log(payload);

        const response: AxiosResponse<RegisterInitResponse> = await apiClient.post(
            'pwa/user/register',
            payload
        );

        console.log('Registration Init Success:', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function LoginVerifyMobileOtp(payload: LoginVerifyOtpPayload): Promise<LoginVerifyOtpResponse> {

    try {
        console.log('Verifying OTP:', payload);

        const response: AxiosResponse<LoginVerifyOtpResponse> = await apiClient.post(
            'pwa/user/login',
            payload
        );

        console.log('OTP Verification Success:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchRestaurantsList(): Promise<RestaurantApiResponse> {
    const token = localStorage.getItem("authToken");
  try {
     const response = await apiClient.get("m/restaurant?city_id=118&&", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });;
    console.log("Personal Data Init Success:", response);
    return response.data
  } catch (error) {
    throw error;
  }
}