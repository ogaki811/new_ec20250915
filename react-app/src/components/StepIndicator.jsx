function StepIndicator({ currentStep = 1, steps }) {
  const defaultSteps = [
    { number: 1, label: 'カート確認' },
    { number: 2, label: 'お客様情報' },
    { number: 3, label: '決済・完了' }
  ];

  const displaySteps = steps || defaultSteps;

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">ショッピングカート</h1>
        <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
          {displaySteps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {index > 0 && (
                <div className="text-gray-400 mx-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              )}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.number === currentStep
                    ? 'bg-blue-600 text-white'
                    : step.number < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.number < currentStep ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div className={`text-sm ${
                  step.number === currentStep ? 'font-medium text-gray-900' : 'text-gray-600'
                }`}>
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepIndicator;
