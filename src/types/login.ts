export interface RegisterInitPayload {
    phone: string;
    dial_code: string;
}

export interface RegisterInitResponse{
    status: string;
    status_code: number;
    data: string;
}

export interface LoginVerifyOtpPayload {
    phone: string;
    otp:string;
    dial_code: string;
}

export interface UserData {
        user_id: string;
        user_name: string;
        user_gender: string;
        user_email: string;
        dial_code: string;
        user_mobile: string;
        member_since: string;
        email_verified: boolean;
        mobile_verified: boolean;
        user_username: null,
        password: string;
        last_password_update: string;
        user_source: string;
        user_image: string;
        dob: null,
        first_order: boolean;
        refer_code:string;
        favorite: null,
        food_tags: null,
        workmode: null,
        country_id: null,
        last_known_location: null,
        is_b2b: boolean;
        token: string;
        is_new_user: boolean;
    }


export interface LoginVerifyOtpResponse {
    status: string;
    status_code: 200,
    data: UserData
    error_message?: string;
}


export interface Restaurant {
  restaurant_id: string;
  restaurant_name: string;
  logo: string;
  address_complete: string | null;
}

export interface RestaurantApiResponse {
  status: string;
  status_code: number;
  data: {
    results: Restaurant[];
    meta: {
      total_pages: number;
      total_count: number;
    };
  };
}
