import React, { useState } from "react";

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
        // Buradan axios.post'u kaldırıyoruz ve direkt onSave'i çağırıyoruz.
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white p-8 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Avukat Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="nationalId">
                                T.C. Kimlik No
                            </label>
                            <input
                                type="text"
                                id="nationalId"
                                className="w-full p-2 border border-gray-300 rounded"
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
                            <label className="block text-gray-700 mb-2" htmlFor="firstName">
                                İsim
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Avukatın ismini girin"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="lastName">
                                Soyisim
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Avukatın soyismini girin"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="username">
                                Kullanıcı Adı
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Kullanıcı adı girin"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="mail">
                                E-posta
                            </label>
                            <input
                                type="email"
                                id="mail"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="E-posta adresini girin"
                                value={formData.mail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Şifre
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Şifre girin"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="w-12 h-10 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 flex items-center justify-center"
                                    onClick={handleGeneratePassword}
                                >
                                    <i className="fa fa-dice"></i>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-10 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 flex items-center justify-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
