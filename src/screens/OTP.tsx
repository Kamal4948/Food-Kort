import { useState } from 'react';

import OtpInput from '../components/OtpInput/OtpInput';
import { useNotification } from '../components/Toaster/Toaster';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginVerifyMobileOtp } from '../apis/login/login';

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const { phone, dialCode } = location.state || {};
    const {showSuccessAlert,showErrorAlert} = useNotification()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState('');


    const verifyOtp = async (otpValue: string) => {
        setIsSubmitting(true);

        if ( otpValue.length !== 6) {
            showErrorAlert('Please enter the 6-digit OTP.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await LoginVerifyMobileOtp({ phone, otp:otpValue,dial_code:dialCode });
           if(response.status_code===200){
            localStorage.setItem('authToken', response.data.token);
            showSuccessAlert('OTP verified successfully!');
             navigate("/Home", {
              state: {
                data: response.data,
              },
            });
           }else{
            showErrorAlert(response.error_message)
           }            
            console.log('OTP Verified:', response);

        } catch (err: unknown) {
            if (err instanceof Error) {
                showErrorAlert(err.message);
            } else {
                showErrorAlert('Verification failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        verifyOtp(otp)
    };

    return (
        <div className="auth-wrapper w-full flex flex-col-reverse md:flex-row md:h-screen md:overflow-hidden">
            <div className="md:w-1/2 flex items-center justify-center bg-[#F7FAFC] overflow-y-auto relative">
                <button onClick={() => navigate('/')} className="flex items-center absolute left-5 top-5 gap-3">
                    <img src="/assets/Icons/back.svg" alt="Back" width={40} height={40} />
                </button>

                <div className="p-[30px] max-md:pt-[60px] w-full lg:w-[533px] m-auto">
                    <div className="mb-[20px]">
                        <h2 className="text-[28px] lg:text-[35px] text-[#1E232C] font-bold mb-[7px]">
                          OTP Verification
                        </h2>
                        <p className="lg:text-[18px] text-[16px] text-[#838BA1]">
                          Enter the verification code we just sent on your Mobile Number.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <OtpInput onChange={setOtp} onComplete={(val)=>verifyOtp(val)}/>

                        <div className="flex flex-col gap-4">
                            <button type="submit" className="button button-primary w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Verifying...' : 'Verify'}
                            </button>

                           <p className="lg:text-[18px] text-center text-[16px] text-[#838BA1]">
                            Didn’t receive code?{" "}
                            <span className="text-blue-600 cursor-pointer hover:underline">
                              Resend
                            </span>
                          </p>

                        </div>
                    </form>
                </div>
            </div>

            <div className="md:w-1/2 w-full h-full">
                <div className="h-full max-md:h-[300px] w-full bg-[url('/assets/Images/image-2.jpg')] bg-cover bg-no-repeat flex justify-center items-center">
                    <div className="max-md:w-[220px]">
                        <img src="/assets/Images/logo.png" alt="Logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
