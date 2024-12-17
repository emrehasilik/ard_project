import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaDice } from "react-icons/fa";

const AddLawyer = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nationalId: "",
        username: "",
        password: "",
        mail: "",
        phone: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        setFormData((prev) => ({ ...prev, password: newPassword }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const fieldNames = {
            nationalId: "T.C. Kimlik No",
            firstName: "İsim",
            lastName: "Soyisim",
            username: "Kullanıcı Adı",
            password: "Şifre",
            mail: "E-posta"
        };

        for (const [key, value] of Object.entries(formData)) {
            if (value.trim() === "" && fieldNames[key]) {
                setError(`Lütfen ${fieldNames[key]} alanını doldurun.`);
                return;
            }
        }

        setError("");
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-[#FFFFFF] p-8 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto border-2 border-[#D4AF37]">
                <h2 className="text-2xl font-bold mb-6 text-[#002855] border-b-2 border-[#D4AF37] pb-2">
                    Avukat Ekle
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="nationalId">
                                T.C. Kimlik No
                            </label>
                            <input
                                type="text"
                                id="nationalId"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                placeholder="T.C. Kimlik Numaranızı girin"
                                maxLength="11"
                                value={formData.nationalId}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                                    handleInputChange({ target: { id: "nationalId", value: onlyNums } });
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="firstName">
                                İsim
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                placeholder="Avukatın ismini girin"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="lastName">
                                Soyisim
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                placeholder="Avukatın soyismini girin"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="username">
                                Kullanıcı Adı
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                placeholder="Kullanıcı adı girin"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="mail">
                                E-posta
                            </label>
                            <input
                                type="email"
                                id="mail"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                placeholder="E-posta adresini girin"
                                value={formData.mail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-[#002855] font-semibold mb-2" htmlFor="password">
                                Şifre
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                    placeholder="Şifre girin"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 text-gray-700 hover:text-[#D4AF37] hover:scale-110 transition-transform duration-200"
                                    onClick={handleGeneratePassword}
                                >
                                    <FaDice size={20} />
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-gray-700 hover:text-[#D4AF37] hover:scale-110 transition-transform duration-200"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#B89B2F]"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLawyer;
