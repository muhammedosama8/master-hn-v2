import { useTranslation } from 'react-i18next';
import Area from '../../Enums/Area';
import knet from '../../assets/knet.svg'
import visa from '../../assets/visa.svg'
import './style.css'

const Checkout = () =>{
    const {t} = useTranslation()
    return  <section className="checkout_page stage_padding">
    <div className="container">
        <div className="sec_head wow fadeInUp">
            <h4>{t("Checkout")}</h4>
        </div>
        <div className="row">
            <div className="col-lg-8">
                <div className="cont-checkout wow fadeInUp">
                    <form className="form-checkout form-st guestForm">                               
                        <div className="cont-user wow fadeInUp">
                            <h5 className='text-primary mt-5 mb-2'>{t("User Details")}</h5>

                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <label>{t("Full Name")}*</label>
                                    <input type="text" className="form-control" name="name" placeholder={t("Please Enter")} required />
                                </div>
                                <div className="col-md-4 form-group">
                                    <label>{t("Email")}*</label>
                                    <input type="email" className="form-control" name="email" placeholder={t("Please Enter")} required />
                                </div>
                                <div className="col-md-4 form-group">
                                    <label>{t("Phone")}*</label>
                                    <input type="number" className="form-control" id="mobile" name="mobile" placeholder={t("Please Enter")} required />
                                </div>
                            </div>
                        </div>
                        <div className="cont-address wow fadeInUp mt-4">
                                <h5 className='text-primary mb-2'>{t("Address Details")}</h5>
                                <div className="row">
                                    <div className="col-md-4 mb-3 form-group selectBt">
                                        <label>{t("Area")}*</label>
                                        <Area />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group selectBt">
                                        <label>{t("Block")}*</label>
                                        <input type="text" className="form-control" name="block" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Street")}*</label>
                                        <input type="text" className="form-control" name="street" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Avenue")} ({t("Optional")})</label>
                                        <input type="text" className="form-control" name="avenue" placeholder={t("Please Enter")} />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group">
                                        <label>{t("Address Type")}*</label>
                                        <select 
                                            className="form-control form-select address_type" 
                                            name="type"
                                        >
                                            <option value="">{t("Please Select")}</option>
                                            <option value="1">{t("Flat")}</option>
                                            <option value="2">{t("House")}</option>
                                            <option value="3">{t("Office")}</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3  form-group apartment_office_type">
                                        <label>{t("Building Number")}*</label>
                                        <input type="text" className="form-control" name="building_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group apartment_office_type">
                                        <label>{t("Floor")}*</label>
                                        <input type="text" className="form-control" name="floor_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group apartment_type">
                                        <label>{t("Apartment Number")} ({t("Optional")})</label>
                                        <input type="text" className="form-control" name="apartment_number" placeholder={t("Please Enter")} required />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group house_type">
                                        <label>{t("House Number")}*</label>
                                        <input type="text" className="form-control" name="house_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>

                                    <div className="col-md-4 mb-3 form-group office_type">
                                        <label>{t("Office Number")}*</label>
                                        <input type="text" className="form-control" name="office_number"
                                            placeholder={t("Please Enter")} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <label>{t("Extra Directions")}</label>
                                        <textarea 
                                            className="form-control" 
                                            rows={10}
                                            name="notes" 
                                            placeholder={t("Please Enter")} 
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            

            <div className="col-lg-4">
                <div className="coupon-code wow fadeInUp">
                    <h5>{t("Coupon Code")}</h5>
                    <form className="form-coupon" id="checkoutForm" method="POST">
                        {/* action="https://ocs-omniya.com/ar/checkout" */}
                        <div className="form-group">
                            <input type="text" className="form-control" name="code_name" id="code_name"
                                placeholder={t("Please Enter")} />
                            <button className="btn-site" id="check_code"><span>{t("Apply")}</span></button>
                        </div>
                        <span className="success-promo validCode" style={{display: "none"}}>تم التطبيق بنجاح!</span>
                        <span className="wrong-promo invalidCode" style={{display: "none"}}>رمز الخصم غير صالح!</span>
                    </form>

                </div>
                <div className="payment-method wow fadeInUp">
                    <h5>{t("Payment Method")}</h5>
                    <div className="list-pay">
                        <div>
                            <input className="form-check-input" type="radio" name="payment_type" id="ch-knet"
                                value="1" />
                            <label className="form-check-label" for="ch-knet">
                                <img src={knet} alt="" />
                                {t("KNET")}                                
                            </label>
                        </div>
                        <div>
                            <input className="form-check-input" type="radio" name="payment_type" id="ch-visa"
                                value="2" />
                            <label className="form-check-label" for="ch-visa">
                                <img src={"https://ocs-omniya.com/shopWebsite/images/visa-mstrcard.svg"} alt="visa" />
                                {t("Visa/MasterCard")}                                
                            </label>
                        </div>
                    </div>
                </div>
                <div className="cont-pay-dts wow fadeInUp">
                    <h5>{t("Payment Detail")}</h5>
                    <div>
                        <p>{t("Sub Total")}</p>
                        <span className="sub_total">15.000 {t("KWD")}</span>
                    </div>
                    <div>
                        <p>{t("Discount")}</p>
                        <span className="discount_amount">0.000 {t("KWD")}</span>
                    </div>
                    <div>
                        <p>{t("Delivery Charges")}</p>
                        <span className="delivery_charges">0.000 {t("KWD")}</span>
                    </div>
                    <div>
                        <p>{t("Total")}</p>
                        <span className="total_price">15.000 {t("KWD")}</span>
                    </div>
                    <a href="#" className="send_form"><span>{t("Submit Order")}</span></a>
                </div>
            </div>
        </div>
    </div>
</section>
}
export default Checkout;