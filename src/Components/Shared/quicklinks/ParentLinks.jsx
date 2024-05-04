import Link from "./Link";
//icons
import { ContactInformationIcon, DeliveryInfoIconIcon, FAQsIcon, FeedbackIcon,
    LiveChatSupportIcon, OrderingGuideIcon, PrivacyPolicyIcon, TechnicalSupportIcon, TermsAndServicesIcon } from "./LinkIcons";



const ParentLinks = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Link icon={ContactInformationIcon} text={'Contact Information'} />
                <Link icon={LiveChatSupportIcon} text={'Live Chat Support'} />
                <Link icon={FAQsIcon} text={'FAQs'} />
                <Link icon={OrderingGuideIcon} text={'Ordering Guide'} />
                <Link icon={DeliveryInfoIconIcon} text={'Delivery Information'} />
                <Link icon={TermsAndServicesIcon} text={'Terms of Service'} />
                <Link icon={FeedbackIcon} text={'Feedback Form'} />
                <Link icon={TechnicalSupportIcon} text={'Technical Support Resources'} />
                <Link icon={PrivacyPolicyIcon} text={'privacy & policy'} />
            </div>
        </>
    );
};

export default ParentLinks; 