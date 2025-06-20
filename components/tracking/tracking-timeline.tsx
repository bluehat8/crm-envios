import { CheckCircle, Circle, Clock } from "lucide-react"

interface TimelineItem {
  status: string
  location: string
  date: string
  completed: boolean
}

interface TrackingTimelineProps {
  timeline: TimelineItem[]
}

export function TrackingTimeline({ timeline }: TrackingTimelineProps) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            {item.completed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : index === timeline.findIndex((t) => !t.completed) ? (
              <Clock className="h-6 w-6 text-blue-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300" />
            )}
            {index < timeline.length - 1 && (
              <div className={`w-0.5 h-8 mt-2 ${item.completed ? "bg-green-200" : "bg-gray-200"}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-medium ${
                  item.completed
                    ? "text-green-700"
                    : index === timeline.findIndex((t) => !t.completed)
                      ? "text-blue-700"
                      : "text-gray-500"
                }`}
              >
                {item.status}
              </p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <p className="text-sm text-muted-foreground">{item.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
