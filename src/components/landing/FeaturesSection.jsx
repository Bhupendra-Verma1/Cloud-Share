import { ArrowUpCircle, Shield, Share2, CreditCard, FileText, Clock } from "lucide-react";

const FeaturesSection = ({features}) => {

    const renderIcon = (iconName, iconColor) => {
        const iconProp = {size: 25, className : iconColor};

        switch(iconName) {
            case 'ArrowUpCircle' :
                return <ArrowUpCircle  {...iconProp} />;
            case 'Shield' :
                return <Shield  {...iconProp} />;
            case 'Share2' :
                return <Share2  {...iconProp} />;
            case 'CreditCard' :
                return <CreditCard  {...iconProp} />;
            case 'FileText' :
                return <FileText  {...iconProp} />;
            case 'Clock' :
                return <Clock  {...iconProp} />;
            default :
                return <FileText  {...iconProp} />;
        }
    }

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 s:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Everything you need for the file sharing
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        CloudShare provides all the tools you to manage digital content
                    </p>
                </div>
                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="pt-5 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                                <div className="flor-root bg-gray-50 rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                                            {renderIcon(feature.iconName, feature.iconColor)}
                                        </div>
                                        <h3 className="text-larg mt-5 font-md text-gray-900 tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection;