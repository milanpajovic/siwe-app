import { NodeSDK } from '@opentelemetry/sdk-node';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const traceExporter = new OTLPTraceExporter();
const defaultSpanProcessor = new SimpleSpanProcessor(traceExporter);

export const initTracing = (serviceName: string) => {
  const traceExporter = new ConsoleSpanExporter();
  return new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
    traceExporter,
    spanProcessor: defaultSpanProcessor,
    instrumentations: [getNodeAutoInstrumentations()],
  });
};
